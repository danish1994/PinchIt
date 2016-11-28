'use strict'

import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight, Alert, Navigator} from 'react-native'

export default class Title extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          PinchIt
        </Text>
        <TouchableHighlight style={styles.button}
          onPress={this.clickFucntion}>
          <Text style={styles.heading1}>Explore!</Text>
        </TouchableHighlight>
      </View>
    )
  }

  clickFucntion(){
    Alert.alert(
      'PinchIt',
      'App Still Under Development',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )

    // fetch('http://localhost:8888/post/',{'method':'GET'})
    // .then((response)=>response.json())
    // .then((responseData)=>{
    //   console.log(responseData)
    //   Alert.alert(
    //     'Alert Title',
    //     JSON.stringify(responseData)
    //   )
    // })
    // .done()
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
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: '#eeeeee',
    height: 70
  },
  heading1: {
    textAlign: 'center',
    color: '#bbbbbb',
    fontSize: 30,
    height: 50
  },
  button: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#0000ff',
    alignSelf : 'stretch',
    justifyContent: 'center',
    alignItems : 'center'
  }
})
