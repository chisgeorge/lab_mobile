import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import EventsList from './EventsList';
import TabBarIcon from '../components/TabBarIcon';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <EventsList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    height: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowOffset:{  width: 0,  height: 3 },
    shadowColor: '#CCC',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    backgroundColor: '#FFF',
    zIndex: 3
  }
});
