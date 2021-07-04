import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,Image,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import  db from '../config';
import firebase from 'firebase';
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
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
    currencyCode:''
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
        return  alert(
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
<ScrollView style={styles.scrollview}>
<KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
<Text style={styles.modalTitle}>Registration</Text>
<Text style={styles.label}>First Name </Text>
<TextInput
style={styles.formInput}
placeholder ={"First Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({
firstName: text
})
}}
/>
<Text style={styles.label}>Last Name </Text>
<TextInput
style={styles.formInput}
placeholder ={"Last Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({
lastName: text
})
}}
/>
<Text style={styles.label}>Mobile Number </Text>
<TextInput
style={styles.formInput}
placeholder ={"Mobile Number"}
maxLength={10}
keyboardType ={'numeric'}
onChangeText={(text)=>{
this.setState({
phoneNumber: text
})
}}
/>
<Text style={styles.label}>Address </Text>
<TextInput
style={styles.formInput}
placeholder ={"Address"}
multiline = {true}
onChangeText={(text)=>{
this.setState({
address:text
})
}}
/>
<Text style={styles.label}>Currency Code </Text>
<TextInput
style={styles.formInput}
placeholder ={"Country Currency Code"}
maxLength = {8} 
onChangeText={(text)=>{
this.setState({
currencyCode: text
})
}}
/>
<Text style={styles.label}>Last Name </Text>
<TextInput
style={styles.formInput}
placeholder ={"Email"}
keyboardType ={'email-address'}
onChangeText={(text)=>{
this.setState({
emailId: text
})
}}
/>
<Text style={styles.label}>Password</Text>
<TextInput
style={styles.formInput}
placeholder ={"Password"}
secureTextEntry = {true}
onChangeText={(text)=>{
this.setState({
password: text
})
}}
/>
<Text style={styles.label}>Confirm Password</Text>
<TextInput
style={styles.formInput}
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
<Text style={styles.register}>Register</Text>
</TouchableOpacity>

<Text style={styles.cancelButtonText}
onPress={()=>{this.setState({ isModalVisible: false });}}>Cancel</Text>
</KeyboardAvoidingView>
</ScrollView>
</View>
</Modal>
)
}

render(){
return(
<View style={styles.container}>
{this.showModal()}
<View style={styles.c}>
<Text style={styles.title}>  Bater System </Text>

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
style={styles.loginButton}
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
<Image
            source={require("../assets/c.png")}
            style={styles.bookImage}
            resizeMode={"stretch"}
          />
</View>
</View>
)
}
}

const styles = StyleSheet.create({
register:{
 fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff"
},
 title :{
   fontSize:50,
   paddingBottom:30,
   color : 'white',
   fontfamily:"Comic Sans MS",
 },
 TextInput:{
   width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 0,
     borderWidth: 2,
    borderColor: "white",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14)
 },
 signButton:{
   width: "75%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "white",
    shadowColor: "#000",
    marginLeft:RFValue(50),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
 },
 loginButton:{
   width: "75%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "white",
    shadowColor: "#000",
    marginLeft:RFValue(50),
    marginBottom:RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
 },
 signup:{
   color:'red',
   fontSize:15,
   fontWeight:'bold',
   
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
color:'purple',
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
    width: "85%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "purple",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10)
  },
  label: {
    fontSize: RFValue(13),
    color: "#717D7E",
    fontWeight: "bold",
    marginRight:RFValue(150)
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#8B008B",
    marginTop: RFValue(10)
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  c: {
    flex: 1,
    backgroundColor: "purple"
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff"
  },
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14)
  },
  bookImage: {
    width: "100%",
    height: RFValue(220)
  }
})
