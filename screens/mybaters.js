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
import {Card,Header} from 'react-native-elements'


export default class BarterScreen extends Component {
  constructor() {
    super();
    this.state = {
     userId : firebase.auth().currentUser.email,
       allBarters : []
    };
         this.requestRef= null
  }



  getAllBarters = () => {
    console.log(this.state.allBarters)
     this.requestRef = db.collection("my_barters").where("donorId" ,'==', this.state.userId) 
     .onSnapshot((snapshot)=>{
       var allBarters = snapshot.docs.map(document => document.data());
       this.setState({
         allBarters : allBarters,
       });
    });
  };

sendItem=(itemDetails)=>{
if(itemDetails.request_status === "item Sent"){
      var requestStatus = "Donor Interested"
      db.collection("my_barters").doc(itemDetails.doc_id).update({
        "request_status" : "Donor Interested"
      })
      this.sendNotification(itemDetails,requestStatus)
    }
    else{
      var doc_id=this.props.navigation.getParam('docId'); 
      console.log("docid"+doc_id); 
      var requestStatus = "item Sent"
      db.collection("my_barters").doc(doc_id).update({ 
        "request_status" : "item Sent" 
        })
            this.sendNotification(itemDetails,requestStatus)
        }
    }



sendNotification=(itemDetails,requestStatus)=>{
    var requestId = itemDetails.request_id
    var donorId = itemDetails.donor_id
    db.collection("all_notifications")
    .where("request_id","==", requestId)
    .where("donor_id","==",donorId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "item Sent"){
          message = this.state.donorName + " sent you item"
        }else{
           message =  this.state.donorName  + " has shown interest in exchanging the item"
        }
        db.collection("all_notifications").doc(doc.id).update({
          "message": message,
          "notification_status" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
  }


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
<TouchableOpacity style={[
styles.button,{backgroundColor:item.request_status==="item Sent"?"green":"#ff5722"}
]} 
onPress={()=>{
this.sendItem(item)
}}>
<Text style={{color:'#ffff'}}>{item.request_status=="item Sent"?"item Sent":"Send item"}</Text> 
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
<Header 
leftComponent={
<Icon name='arrow-left' 
type='feather' 
color='#696969' 
onPress={()=>this.props.navigation.goBack()}
/>
}
centerComponent={{text: "My Barters",
style:{color: '#90A5A9',
fontSize: 20,
fontWeight:'bold'
}}
}
backgroundColor="#eaf8fe"
/>

        <View style={{flex:1}}>
        {this.state.allBarters.length === 0 ? (
          <Text style={{ fontSize: 20 }}>     List of barters is not avialalbe.       </Text>
        ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allBarters}
              renderItem={this.renderItem}
            />
        )}
      </View>
            </View>

    );
  }
}

const styles = StyleSheet.create({
  
  
  
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
