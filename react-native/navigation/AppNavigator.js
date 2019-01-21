import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';

export default createRootNavigator = (isLogedIn = false)  => { 

return createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabNavigator
  },
  {initialRouteName: isLogedIn ? "Main" : "Login"}
);
}