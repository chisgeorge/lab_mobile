import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Text,
    View,
    Animated,
    Easing,
    TextInput
} from 'react-native';
import {Button} from 'react-native-elements'
import EventService from '../services/eventService';


export default class EventItem extends Component {

    state = {
        animatedValue: new Animated.Value(0),
        isExpanded: false,
        title: '',
        description: '',
        start: '',
        end: ''
    }

    onChangeText = (key, val) => {
        console.log("change" + key);
        this.setState({ [key]: val});
    } 

    componentDidMount(){
        this.setState({title: this.props.title, description: this.props.description, start: this.props.start, end: this.props.end});
    }

    expand(){
        this.setState( { isExpanded: true });
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.elastic(1)
        }).start()
    }
    fold(){
        this.setState( { isExpanded: false });
        Animated.timing(this.state.animatedValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.elastic(1)
        }).start()
    }

    onPress = () => {
        this.fold()
      }

    render() {
        const animatedStyle = {
            height: this.state.animatedValue.interpolate({ inputRange: [0, 1], outputRange: [156, 300] }),  
            marginTop: this.state.animatedValue.interpolate({ inputRange: [0, 1], outputRange: [-40, 0] })   
        }
        const animatedOpacity = { opacity: this.state.animatedValue.interpolate({ inputRange: [0, 0.01], outputRange: [0, 1] }) }
        
        const foldedView = <View style= {styles.rowContainer}>
            <View style={ styles.leftLine }/>
            <View style={ styles.centerContainer }>
            <Text style={ styles.title } numberOfLines={2} ellipsizeMode ={'tail'}>
                    { this.props.start }
                </Text>
            <Text style={ styles.title } numberOfLines={2} ellipsizeMode ={'tail'}> 
                        { this.props.end }
                    </Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.rowText}>
                    <Text style={ styles.title } numberOfLines={2} ellipsizeMode ={'tail'}>
                        { this.props.title }
                    </Text>
                    <Text style={styles.description} numberOfLines={4} ellipsizeMode ={'tail'}>
                        {this.props.description}
                    </Text>
                </View>
            </View>
        </View>

        const extendedView = <View style={styles.rightContainerExpended}>
        <View style={ styles.centerContainerExpended }>
        
                <TextInput style={ styles.title } numberOfLines={2} ellipsizeMode ={'tail'}
                      defaultValue = { this.props.start } onChangeText={value => this.onChangeText('start', value)}/>
                <TextInput style={ styles.title } numberOfLines={2} ellipsizeMode ={'tail'}
                      defaultValue = { this.props.end } onChangeText={value => this.onChangeText('end', value)}    />
        </View>
        <View style={styles.rightContainerExpended}>
            <View style={styles.rowText}>
            <TextInput style={ styles.title } numberOfLines={2} ellipsizeMode ={'tail'}
                      defaultValue = { this.props.title } onChangeText={value => this.onChangeText('title', value)}/>
                <TextInput style={ styles.description } numberOfLines={2} ellipsizeMode ={'tail'}
                      defaultValue = { this.props.description } onChangeText={value => this.onChangeText('description', value)}/>
            </View>
            <Button   containerStyle={styles.Button}
                          buttonStyle={styles.Button}
                          onPress = { async() => {
                              this.fold()
                              console.log(this.state.title);
                              await EventService.updateEvent({_id: this.props.id, title: this.state.title, description: this.state.description, start: this.state.end, end: this.state.end });
                              this.props.refresh();
                            }
                          }
                          raised = {true}
                          borderRadius = { 20 }
                          title="DONE"
                      />
            <Button   containerStyle={styles.ButtonDelete}
                          buttonStyle={styles.ButtonDelete}
                          onPress = {async () =>  {
                            this.fold()
                            await EventService.deleteEvent({_id: this.props.id });
                            this.props.refresh();                            
                          }}
                          raised = {true}
                          borderRadius = { 20 }
                          title="DELETE"
                      />
        </View>
        </View>
        return(
            <View style={styles.ItemContainer}>
            <Animated.View style={animatedOpacity}>
            <TouchableHighlight style={styles.Button} onPress = {this.onPress} underlayColor='#00BBBB'>
                        <Text>FOLD</Text>
            </TouchableHighlight>
            </Animated.View>
            <TouchableWithoutFeedback onLongPress={() => { if(!this.state.isExpanded) this.expand()} }>
                <Animated.View style={[styles.row, animatedStyle]}>  
                    {!this.state.isExpanded ? foldedView : extendedView}
                </Animated.View>
            </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    ItemContainer: {
        marginVertical: 25,
        marginHorizontal: 10
    },

    row: {
        backgroundColor: 'red',
        shadowOffset:{  width: 0,  height: 0 },
        shadowColor: '#CCC',
        shadowOpacity: 1.0,
        shadowRadius: 2,
        borderRadius: 10
    },

    rowContainer: {
        flexDirection: 'row',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },

    rowContainerExtended: {
        borderBottomRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
    },

    leftLine: {
        height: '100%',
        marginLeft: -3,
        width: 6,
        borderRadius: 3,
        backgroundColor : '#00DCFF',
        zIndex: 1
    },
    centerContainer: {
        flex: 3,
        marginLeft: -3,
        backgroundColor: '#E8E8E8',
        height: '100%',
        justifyContent: 'space-around'
    },
    centerContainerExpended: {
        flex: 3,
        backgroundColor: '#E8E8E8',
        height: '100%',
        justifyContent: 'space-around'
    },
    rightContainer: {
        flex: 7,
        height: '100%',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#FFF'
    },
    rightContainerExpended: {
        flex: 7,
        height: '100%',
        borderBottomRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FFF'
    },
    title: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#777'
    },
    description: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#777'
    },
    rowText: {
        flex: 4,
        flexDirection: 'column'
    },
    Button: {
        height: 30,
        borderRadius: 20,
        width: '40%',
        alignItems: 'center',
        backgroundColor: '#00DCFF',
        marginBottom: 5,
        padding: 8
      },
      ButtonDelete: {
        height: 30,
        borderRadius: 20,
        width: '40%',
        alignItems: 'center',
        backgroundColor: 'red',
        marginBottom: 5,
        padding: 8
      },
});

