import { BASE_URL } from '../constants/ServerAPI'
import {SecureStore} from 'expo';

export default class AuthService {
    static async login(username, password) {
        const rawResponse = await fetch(BASE_URL.concat("login"), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({username: username, password: password})
        });
        const response = await rawResponse.json();
        if(response.hasOwnProperty("token"))
            {
            //const token = await SecureStore.getItemAsync('auth_token');
            authToken = response.token;
            await SecureStore.setItemAsync('auth_token', "Baerer " + authToken);
            return true;
            }
        return false;
    }
    static async getAuthToken()
    {
        const token = await SecureStore.getItemAsync('auth_token');
        return token;
    }
    static async logout(){
        await Expo.SecureStore.deleteItemAsync('auth_token');
        return true;
    }

}