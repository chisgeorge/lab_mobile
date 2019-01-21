import React from 'react';
import { Button, ScrollView } from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import AuthService from '../services/authService';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView>
    <Button
                          onPress = {() => {
                            AuthService.logout();
                            this.props.navigation.navigate("Login");
                          }}
                          title="Logout"/>
    <ExpoConfigView/>
    </ScrollView>
    );
  }
}
