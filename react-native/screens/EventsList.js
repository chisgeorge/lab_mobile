import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    FlatList,
    Text,
    View,
} from 'react-native';
import EventService from '../services/eventService'
import EventItem from './EventItem';
import { Icon } from 'react-native-elements'

import Animation from 'lottie-react-native';

import anim from '../assets/loading.json';


export default class EventsList extends Component {
    constructor(props) {
        super(props);
        this.reloadList = this.reloadList.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            added: false,
            events: [],
            isLoading: true,
        }
    }
    reloadList = () =>
    {
        console.log("reloadList");
        EventService.reloadList().then(() => EventService.getList()
        .then((response) => JSON.parse(response))
        .then((responseList) => {
            responseList.map((element) => element.key = element._id);
            this.setState({events : responseList, isLoading: false});
            this.refreshList();
        }));
    }
    refreshList = () => {
        EventService.getList()
        .then((response) => JSON.parse(response))
        .then((responseList) => {
            responseList.map((element) => element.key = element._id);
            this.setState({events : responseList, isLoading: false});
        });
    }
    componentDidMount()
    {
        this.reloadList();
        this.animation.play();
    }

    _renderItem = ({item}) => (
        <EventItem
            id={item._id}
            key={item.key}
            title={item.title}
            description={item.description}
            start={item.start}
            end={item.end}
            refresh = {this.reloadList}
        />
    );

    _keyExtractor = (item, index) => item.key;

    render() {
        if(this.state.isLoading)
               return( <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                />
                <Animation
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
                </View>)
        else
                return (<View style={[styles.container ]}>
                <StatusBar
                    barStyle="dark-content"
                />
                <View style={{flexDirection: "row", zIndex: 1}} >
                <Icon 
                raised
                name='add'
                color='#00aced'
                onPress={
                    () => {
                    if(!this.state.added)
                    {const events = this.state.events;
                    events.unshift( {key: "key#"+events.length, title: "", description: "", start: "", end: ""});
                    console.log(events);
                    this.setState({ events: events.slice(0), added: true});}
                    }
        } />
        <Icon 
                raised
                name='refresh'
                color='#00aced'
                onPress={
                    () => {
                    this.reloadList();
                    }
        } /></View>
                <FlatList style= {{paddingTop: 40,marginTop: -60, zIndex: 0}}
                    data={this.state.events}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: -5,
        flex: 1,
        backgroundColor: '#FFF',
    }
});