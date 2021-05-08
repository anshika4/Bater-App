import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,Image,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import  db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component{
  constructor(){
    super()
    this.state={
    firstName:'',
    lastName:'',
    phoneNumber:'',
    address:'',
    emailId:'',
    password:'',
    confirmPassword:'',
    isVisible:'false',
    }
  }

  signUp = (emailId, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.phoneNumber,
          email_id:this.state.emailId,
          address:this.state.address
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }



login=(emailId, password)=>{
firebase.auth().signInWithEmailAndPassword(emailId, password).then((response)=>{
  this.props.navigation.navigate("home")
})
.catch((error)=> {
var errorCode = error.code;
var errorMessage = error.message;
return alert(errorMessage)
})
}

showModal=()=>{
return(
<Modal 
animationType="fade"
transparent={true}
visible={this.state.isVisible}
>

<View style={styles.modalContainor}>
<ScrollView style={{width:'100%'}}>
<KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
<Text style={styles.modalTitle}>Registration</Text>

<TextInput
style={styles.TextInput}
placeholder ={"First Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({
firstName: text
})
}}
/>

<TextInput
style={styles.TextInput}
placeholder ={"Last Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({
lastName: text
})
}}
/>

<TextInput
style={styles.TextInput}
placeholder ={"Mobile Number"}
maxLength={10}
keyboardType ={'numeric'}
onChangeText={(text)=>{
this.setState({
phoneNumber: text
})
}}
/>

<TextInput
style={styles.TextInput}
placeholder ={"Address"}
multiline = {true}
onChangeText={(text)=>{
this.setState({
address:text
})
}}
/>

<TextInput
style={styles.TextInput}
placeholder ={"Email"}
keyboardType ={'email-address'}
onChangeText={(text)=>{
this.setState({
emailId: text
})
}}
/>

<TextInput
style={styles.TextInput}
placeholder ={"Password"}
secureTextEntry = {true}
onChangeText={(text)=>{
this.setState({
password: text
})
}}
/>

<TextInput
style={styles.TextInput}
placeholder ={"Confirm Password"}
secureTextEntry = {true}
onChangeText={(text)=>{
this.setState({
confirmPassword: text
})
}}
/>

<TouchableOpacity style={styles.regesterButton} 
onPress={()=>this.signUp(this.state.emailId, this.state.password, this.state.confirmPassword)}>
<Text style={styles.register}>Rigestration</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.regesterButton} 
onPress={()=>this.setState({"isVisible":false})}>
<Text style={styles.register}>cancel</Text>
</TouchableOpacity>
</KeyboardAvoidingView>
</ScrollView>
</View>
</Modal>
)
}

render(){
return(
<View style={{justifyContent: 'center',alignItems: 'center'}}>
{
this.showModal()
}

<Text style={styles.title}>  Bater System </Text>
<Image
style={styles.image} 
source={require('../assets/images.png')}/>

<TextInput
style={styles.TextInput}
placeholder ={"Email"}
keyboardType ={'email-address'}
onChangeText={(text)=>{
this.setState({
emailId: text
})
}}
/>
<TextInput
style={styles.TextInput}
placeholder ={"Password"}
secureTextEntry = {true}
onChangeText={(text)=>{
this.setState({
password: text
})
}}
/>

<TouchableOpacity
style={styles.signButton}
onPress={()=>{
this.login(this.state.emailId, this.state.password)
}}
>
<Text style={styles.signup}>login</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.signButton}
onPress={()=>this.setState({"isVisible":true})}
>
<Text style={styles.signup}>sign up</Text>
</TouchableOpacity>
</View>
)
}
}

const styles = StyleSheet.create({
register:{
textAlign:'center',
justifyContent:'center',
alignItems:'center',
fontWeight:'bold',
color:'red',
backgroundColor:'white',
fontSize:10
},
 title :{
   fontSize:50,
   fontWeight:'100',
   paddingBottom:30,
   color : '#ff3d00'
 },
 TextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 signButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:2,
   marginTop:30,
   marginLeft:70,
  backgroundColor:'white'
 },
 signup:{
   color:'red',
   fontSize:15,
   fontWeight:'bold'
 },
image:{
width: 150,
height: 130,
marginTop: 20,
marginLeft: 100,
},
KeyboardAvoidingView:{
flex:1,
justifyContent:'center',
alignItems:'center'
},
modalTitle :{
justifyContent:'center',
alignSelf:'center',
fontSize:30,
color:'#ff5722',
margin:50
},
modalContainor:{
flex:1,
borderRadius:20,
justifyContent:'center',
alignItems:'center',
backgroundColor:"#ffff",
marginRight:30,
marginLeft : 30,
marginTop:80,
marginBottom:80,
},
regesterButton:{
width:200,
height:40,
alignItems:'center',
justifyContent:'center',
borderWidth:1,
borderRadius:10,
marginTop:30
},
})
