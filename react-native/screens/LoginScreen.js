import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, TextInput  } from 'react-native';
import { LinearGradient } from "expo"
import AuthService from '../services/authService'
import {Button, FormLabel, FormInput} from 'react-native-elements'

export default class LoginScreen extends React.Component {
    state = { username: '', password: '' }

    onChangeText = (key, val) => {
        this.setState({ [key]: val})
    } 

    render(){
        return (
            <LinearGradient colors = {['#ad5389', '#3c1053']} style={ styles.LinearGradient } >
                <SafeAreaView style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: '25%'}} 
                keyboardShouldPersistTaps='handled'>
                <FormLabel>username</FormLabel>
                <TextInput style={styles.TextInput} onChangeText={value => this.onChangeText('username', value)}/>
                <FormLabel>password</FormLabel>
                <TextInput  style={styles.TextInput} onChangeText={value => this.onChangeText('password', value)} secureTextEntry/>
                <Button   containerStyle={styles.Button}
                          buttonStyle={styles.Button}
                          onPress = { async () => {
                            const isLoggedIn = await AuthService.login(this.state.username, this.state.password);
                            if(isLoggedIn)
                              this.props.navigation.navigate("Main");
                            }
                        }
                          raised = {true}
                          borderRadius = { 20 }
                          title="Login"
                      />
                </ScrollView>
                </SafeAreaView>
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    TextInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 20,   
        margin: 5,
        height: 40,
        borderRadius: 20,
        shadowOpacity: 0.75,
        shadowRadius: 10,
    },
    LinearGradient : {
        flex: 1,
    },
    Button: {
        marginTop: 20,
        alignSelf: 'center',
        height: 40,
        width: '60%'
    }
})