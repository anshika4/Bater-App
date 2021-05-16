import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,Image,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import  db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends Component{
  constructor(){
    super()
    this.state={
    discription:'',
    itemName:'',
    userName:firebase.auth().currentUser.email,
    }
  }
createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

addItem = (itemName,discription) =>{
  var userName= this.state.userName
      var randomRequestId = this.createUniqueId()
      
db.collection('exchange').add({
"item_name"   : itemName,
"description" : discription,
"user_id":userName,
"request_id"  : randomRequestId,
})
this.setState({
  itemName : '',
  discription :''
})
return  Alert.alert(
'item ready to change',
'',
[
{text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen')},
]
);
}

 



render(){
return(
<View style={{justifyContent: 'center',alignItems: 'center'}}>
<Text style={styles.title}>  List Of Items </Text>
<KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
<TextInput
style={styles.formTextInput}
placeholder ={"addItem"}
onChangeText={(text)=>{
this.setState({
itemName: text
})
}}
value={this.state.itemName}
/>
<TextInput
style={[styles.formTextInput,{height:300}]}
multiline
placeholder={"Why do you need the book"}
numberOfLines={8}
onChangeText={(text)=>{
this.setState({
discription: text
})
}}
value={this.state.discription}
/>
</KeyboardAvoidingView>
<TouchableOpacity
style={styles.signButton}
onPress={()=>{this.addItem(this.state.itemName, this.state.discription)}}>
<Text style={styles.signup}>addItem</Text>
</TouchableOpacity>
</View>
)
}
}

const styles = StyleSheet.create({
 title :{
    backgroundcolor:"blue",
   fontSize:20,
   fontWeight:'bold',
   color : 'red',
 },
formTextInput:{
    width:200,
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
 signButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:2,
   marginTop:30,
   marginLeft:1,
  backgroundColor:'white'
 },
 signup:{
   color:'red',
   fontSize:15,
   fontWeight:'bold',
 },
})
