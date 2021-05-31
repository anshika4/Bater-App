import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/home';

import RecieverDetailsScreen  from '../screens/RecieverDetails';
import NotificationScreen  from '../screens/NotificationsScreen';




export const AppStackNavigator = createStackNavigator({
  BookDonateList : {
    screen : HomeScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  },
 NotificationScreen : {
    screen : NotificationScreen,
    navigationOptions:{
      headerShown : false
    }
  },
},
  {
    initialRouteName: 'BookDonateList'
  }
);
