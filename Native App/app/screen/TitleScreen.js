'use strict'

import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, Navigator} from 'react-native'

class TitleScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          PinchIt
        </Text>
        <TouchableOpacity style={styles.button}
           onPress={(event) => this._getInApp() }>
          <Text style={styles.heading1}>Explore!</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _getInApp(){
    this.props.navigator.push({
      ident: 'PersonShow'
    })
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
    alignItems : 'center',
    marginLeft: 60,
    marginRight: 60
  }
})

module.exports = TitleScreen
