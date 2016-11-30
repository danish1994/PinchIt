'use strict'

import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, Navigator, Button} from 'react-native'

import ViewContainer from '../component/ViewContainer'

class TitleScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            PinchIt
          </Text>
          <Button
            onPress = {(event) => this._getInApp()}
            title = 'Explore'
            style = {styles.button}
          />
        </View>
      </ViewContainer>
    )
  }

  _getInApp(){
    this.props.navigator.push({
      ident: 'PostScreen',
      post: {
        title: 'Post 0',
        index: 0
      },
      sceneConfig: Navigator.SceneConfigs.FloatFromBottomAndroid
    })
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: '#eeeeee',
    height: 70
  },
  button: {
    height: 60,
    backgroundColor: '#0000ff',
    alignSelf : 'stretch',
    justifyContent: 'center',
    alignItems : 'center',
    fontSize: 30
  }
})

module.exports = TitleScreen
