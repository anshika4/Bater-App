import React,{Component}from 'react';
import {View,Text,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert,} from 'react-native';
import db from '../config';
import firebase from 'firebase';



export default class SettingScreen extends Component{
   constructor(){
super();
this.state={
emailId:'',
firstName:'',
lastName:'',
address:'',
contact:'',
docId:'',
}
}

getUserDetails=()=>{ 
  var email = firebase.auth().currentUser.email; 
  db.collection('users')
  .where('email_id','==',email).get() 
  .then(snapshot => { 
    snapshot.forEach(doc => { 
      var data = doc.data() 
      console.log(data) 
      this.setState({ 
        emailId : data.email_id, 
        firstName : data.first_name, 
        lastName : data.last_name, 
        address : data.address, 
        contact : data.contact,
         docId : doc.id 
        }) 
        }); 
      }) 
    }
updateUserDetails=()=>{
  db.collection('users').doc(this.state.docId).update({
    first_name:this.state.firstName,
    last_name:this.state.lastName,
    contact:this.state.contact,
    address:this.state.address,
  })
  alert("profile Updated successfuly")
}



componentDidMount(){
  this.getUserDetails()
}

render(){
return(
<View  style={styles.container}>
<Text style={{fontSize:30}}>Settings</Text>
<View style={styles.formContainer}>
<KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
<TextInput
style={styles.formTextInput}
placeholder ={"First Name"}
maxLength ={8}
onChangeText={(text)=>{
this.setState({
firstName: text
})
}}
value={this.state.firstName}
/>
<TextInput
style={styles.formTextInput}
placeholder ={"Last Name"}
maxLength ={8}
onChangeText={(text)=>{
this.setState({
lastName: text
})
}}
value={this.state.lastName}
/>
<TextInput
style={styles.formTextInput}
placeholder ={"Contact"}
maxLength ={10}
keyboardType={'numeric'}
onChangeText={(text)=>{
this.setState({
contact: text
})
}}
value={this.state.contact}
/>
<TextInput
style={styles.formTextInput}
placeholder ={"Address"}
multiline = {true}
onChangeText={(text)=>{
this.setState({
address: text
})
}}
value={this.state.address}

/>

<TouchableOpacity
style={styles.save}
onPress={()=>
this.updateUserDetails()
}
>
<Text style={styles.saveText}>Save</Text>
</TouchableOpacity>


</KeyboardAvoidingView>

</View>   
</View>
)
}
}

const styles = StyleSheet.create({
save:{
width:200,
height:40,
alignItems:'center',
justifyContent:'center',
borderWidth:1,
borderRadius:10,
marginTop:30,
marginLeft:10
},
saveText:{
color:'#ff5722',
fontSize:15,
fontWeight:'bold',
alignItems:'center',
justifyContent:'center',
alignSelf:'center',
},
formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 KeyboardAvoidingView:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
container : { 
  flex:1, 
  alignItems: 'center', 
  justifyContent: 'center'
 }, 
formContainer:{ 
  flex:1, 
  width:'100%', 
  alignItems: 'center'
 },
})

