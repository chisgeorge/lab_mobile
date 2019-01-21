import { BASE_URL } from '../constants/ServerAPI'
import AuthService from './authService';
import {AsyncStorage} from 'react-native';

const objectWithoutKey = (object, key) => {
    const {[key]: _, ...otherKeys} = object;
    return otherKeys;
  }

export default class EventService {
    static async getEvents() {
        const authToken = await AuthService.getAuthToken();
        return fetch(BASE_URL.concat("events"), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : authToken 
            },
            method: "GET"
        });
    }
    static async updateEvent(event){
        const eventBody = objectWithoutKey(event,"key")
        const authToken = await AuthService.getAuthToken();
        return fetch(BASE_URL.concat("events/" + event._id), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : authToken
            },
            method: "PUT",
            body: JSON.stringify(objectWithoutKey(eventBody,"_id"))
        });
    }

    static async addEvent(event){
        const eventBody = objectWithoutKey(event,"key")
        const authToken = await AuthService.getAuthToken();
        return fetch(BASE_URL.concat("events"), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : authToken
            },
            method: "POST",
            body: JSON.stringify(eventBody)
        });
    }
    static async deleteEvent(event){
        const authToken = await AuthService.getAuthToken();
        console.log("da" + event._id);
        return fetch(BASE_URL.concat("events/" + event._id), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : authToken
            },
            method: "DELETE",
            });
    }
    static async reloadList(){
        try{
        this.getEvents().then((response) => response.text())
        .then((text) => AsyncStorage.setItem('events_list',text));
        }
        catch(error){
            console.log("AsyncStorage failed")
        }
    }
    static async getList(){
        try {
            const list = await AsyncStorage.getItem('events_list');
            return list;
          } catch (error) {
            console.log("AsyncStorage failed")
          }
    }
}