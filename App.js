import React from 'react';
import {Image} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import ExchangeScreen from './screens/exchange';
import HomeScreen from './screens/home';
import WelcomeScreen from './screens/WelcomeScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
export default class App extends React.Component {
render(){
return (
<AppContainer/>
);
}
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator}
})
const AppContainer =  createAppContainer(switchNavigator);