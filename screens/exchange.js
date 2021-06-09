import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends Component {
  constructor() {
    super();
    this.state = {
      discription: '',
      itemName: '',
      userName: firebase.auth().currentUser.email,
      IsExchangeRequestActive: '',
      requestedItemName: '',
      exchangeId: '',
      itemStatus: '',
      docId: '',
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  receivedItem = (itemName) => {
    var userId = this.state.userName;
    var exchangeId = this.state.exchangeId;
    db.collection('received_items').add({
      user_id: userId,
      item_name: itemName,
      exchange_id: exchangeId,
      itemStatus: 'received',
    });
  };

  sendNotification = () => {
    db.collection('users')
      .where('username', '==', this.state.userName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().first_name;
          var lastName = doc.data().last_name;

          db.collection('all_notifications')
            .where('exchangeId', '==', this.state.exchangeId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id;
                var bookName = doc.data().item_name;

                db.collection('all_notifications').add({
                  targeted_user_id: donorId,
                  message:
                    name + ' ' + lastName + ' received the item' + itemName,
                  notification_status: 'unread',
                  item_name: itemName,
                });
              });
            });
        });
      });
  };

  getExchangeRequest = () => {
    var exchangeRequest = db
      .collection('exchange_requests')
      .where('username', '==', this.state.userName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().item_status !== 'received') {
            this.setState({
              exchangeId: doc.data().exchangeId,
              requestedItemName: doc.data().item_name,
              itemStatus: doc.data().item_status,
              docId: doc.id,
            });
          }
        });
      });
  };

  getIsExchangeRequestActive() {
    db.collection('users')
      .where('username', '==', this.state.userName)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsExchangeRequestActive: doc.data().IsExchangeRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }

  updateExchangeRequestStatus = () => {
    //updating the book status after receiving the book
    db.collection('requested_requests').doc(this.state.docId).update({
      item_status: 'recieved',
    });

    //getting the  doc id to update the users doc
    db.collection('users')
      .where('username', '==', this.state.userName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //updating the doc
          db.collection('users').doc(doc.id).update({
            IsExchangeRequestActive: false,
          });
        });
      });
  };

  addItem = (itemName, discription) => {
    var userName = this.state.userName;
    var randomRequestId = this.createUniqueId();

    db.collection('exchange').add({
      item_name: itemName,
      description: discription,
      user_id: userName,
      request_id: randomRequestId,
      "item_status" : "requested", 
      "date" : firebase.firestore.FieldValue.serverTimestamp(),
    });
    this.setState({
      itemName: '',
      discription: '',
    });
    return Alert.alert('item ready to change', '', [
      {
        text: 'OK',
        onPress: () => this.props.navigation.navigate('HomeScreen'),
      },
    ]);
  };

  render() {
    if (this.state.IsExchangeRequestActive === true) {
      return (
        // Status screen
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              borderColor: 'orange',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text>item Name</Text>
            <Text>{this.state.requestedItemName}</Text>
          </View>
          <View
            style={{
              borderColor: 'orange',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text> Item Status </Text>

            <Text>{this.state.itemStatus}</Text>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'orange',
              backgroundColor: 'orange',
              width: 300,
              alignSelf: 'center',
              alignItems: 'center',
              height: 30,
              marginTop: 30,
            }}
            onPress={() => {
              this.sendNotification();
              this.updateExchangeRequestStatus();
              this.receivedItem(this.state.requestedItemName);
            }}>
            <Text>I recieved the Item </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}> List Of Items </Text>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'addItem'}
              onChangeText={(text) => {
                this.setState({
                  itemName: text,
                });
              }}
              value={this.state.itemName}
            />
            <TextInput
              style={[styles.formTextInput, { height: 300 }]}
              multiline
              placeholder={'Why do you need the book'}
              numberOfLines={8}
              onChangeText={(text) => {
                this.setState({
                  discription: text,
                });
              }}
              value={this.state.discription}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.signButton}
            onPress={() => {
              this.addItem(this.state.itemName, this.state.discription);
            }}>
            <Text style={styles.signup}>addItem</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  title: {
    backgroundcolor: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  formTextInput: {
    width: 200,
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  signButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginTop: 30,
    marginLeft: 1,
    backgroundColor: 'white',
  },
  signup: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
