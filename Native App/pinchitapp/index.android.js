'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';

import post from './utility/post';

export default class pinchitapp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          PinchIt App
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <TouchableHighlight style={styles.button}
          onPress={this.clickFucntion}>
          <Text style={styles.instructions}>Test</Text>
        </TouchableHighlight>
      </View>
    );
  }

  clickFucntion(){
    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg',
    //   [
    //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ]
    // )

    fetch('http://localhost:8888/post/',{'method':'GET'})
    .then((response)=>response.json())
    .then((responseData)=>{
      console.log(responseData)
      Alert.alert(
        'Alert Title',
        JSON.stringify(responseData)
      )
    })
    .done();



  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#eeeeee'
  },
  instructions: {
    textAlign: 'center',
    color: '#bbbbbb',
    marginBottom: 5,
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#0000ff',
    alignSelf : 'stretch',
    justifyContent: 'center',
    alignItems : 'center'
  }
});

AppRegistry.registerComponent('pinchitapp', () => pinchitapp);
