import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import createRootNavigator from './navigation/AppNavigator';
import AuthService from './services/authService';
import Animation from 'lottie-react-native';

import anim from './assets/loading.json';

export default class App extends React.Component {

  state = {
    checkedLogIn: false,
    isLogedIn : false
}

  componentWillMount(){
    AuthService.getAuthToken().then(token => this.setState({isLogedIn : token != null ? true : false, checkedLogIn : true }))
    .catch(() => console.log("error"));
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
        if(!this.state.checkedLogIn)
          return  <Animation
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            alignSelf: "center",
            width: 150,
            height: 150
          }}
          loop={true}
          source={anim}
        />
        const Layout = createRootNavigator(this.state.isLogedIn);
        return <Layout/>;
    }
  }
