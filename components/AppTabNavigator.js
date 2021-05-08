import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from '../screens/exchange';
import { AppStackNavigator } from './AppStackNavigator'


export const AppTabNavigator = createBottomTabNavigator({
  home : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/h.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "home",
    }
  },
  exchange: {
    screen: ExchangeScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/images.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "exchange",
    }
  }
});
