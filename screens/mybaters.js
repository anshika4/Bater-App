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
  FlatList,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem,Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class BaterScreen extends Component {
  constructor() {
    super();
    this.state = {
     userId : firebase.auth().currentUser.email,
       allBarters : []
    };
  }

sendBook=(bookDetails)=>{
if(bookDetails.request_status === "Book Sent"){
      var requestStatus = "Donor Interested"
      db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status" : "Donor Interested"
      })
      this.sendNotification(bookDetails,requestStatus)
    }
    else{
      var requestStatus = "Book Sent"
      db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status" : "Book Sent"
      })
      this.sendNotification(bookDetails,requestStatus)
    }
}

sendNotification=(bookDetails,requestStatus)=>{
    var requestId = bookDetails.request_id
    var donorId = bookDetails.donor_id
    db.collection("all_notifications")
    .where("request_id","==", requestId)
    .where("donor_id","==",donorId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "Book Sent"){
          message = this.state.donorName + " sent you book"
        }else{
           message =  this.state.donorName  + " has shown interest in donating the book"
        }
        db.collection("all_notifications").doc(doc.id).update({
          "message": message,
          "notification_status" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
  }

keyExtractor=(item,index)=>index.toString();

  getAllBarters = () => {
     this.requestRef = db.collection("all_Barters").where("donor_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allBarters = snapshot.docs.map(document => document.data());
       this.setState({
         allBarters : allBarters,
       });
    });
  };

  componentDidMount() {
    this.getAllBarters();
  }

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name} 
subtitle={'Requested By: '+item.requested_by+"\nStatus :" +item.request_status}  
      titleStyle={{ color: 'black', fontWeight: 'bold' }} 
      leftElement={<Icon name='book' type="font-awesome" color="#696969"/>}
        rightElement={
          <TouchableOpacity style={styles.button}>
            <Text style={{color:'#ffff'}}>Excahnge</Text>
          </TouchableOpacity>
        }
                bottomDivider
      />
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={{flex:1}}>
      <MyHeader title="My Baters" navigation={this.props.navigation} />
        <View style={{flex:1}}>
        {this.state.allBarters.length === 0 ? (
          <Text style={{ fontSize: 20 }}>     List of baters is not avialalbe.       </Text>
        ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allRequests}
              renderItem={this.renderItem}
            />
        )}
      </View>
            </View>

    );
  }
}

const styles = StyleSheet.create({
  
  title: {
    backgroundcolor: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  
  button: {
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
       }

  },
  
});
