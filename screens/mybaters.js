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
<Text style={{color:'white ' }}>Excahnge</Text>
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
