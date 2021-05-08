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
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      allRequests: [],
    };
    this.requestRef = null;
  }

  allRequests = () => {
    this.requestRef = db.collection('exchange').onSnapshot((snapshot) => {
      var allRequests = [];
      snapshot.forEach((doc) => {
        allRequests.push(doc.data());
      });

      this.setState({
        allRequests: allRequests,
      });
    });
  };

  componentDidMount() {
    this.allRequests();
  }

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name} 
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity style={styles.button}
          onPress ={()=>{
                this.props.navigation.navigate("RecieverDetails",{"details": item})
             }}>
          
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
      <MyHeader title="Exchange Books" navigation={this.props.navigation} />
        <View style={{flex:1}}>
        {this.state.allRequests.length === 0 ? (
          <Text style={{ fontSize: 20 }}>List of items is not avialable.</Text>
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
