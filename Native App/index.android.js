'use strict'

import React, {Component} from 'react'
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Alert, Navigator} from 'react-native'

import TitleScreen from './app/screen/TitleScreen'

import ViewContainer from './app/component/ViewContainer'

class pinchitapp extends Component {
    constructor(props) {
        super(props)
    }

    _renderScreen(route, navigator){
      var globalNavigatorProps = { navigator }

      console.log(route.ident)

      switch(route.ident){
        case 'TitleScreen':
          return (
            <TitleScreen
              { ...globalNavigatorProps } />
          )
        default:
          return (
            <Text>Wrong Route ${route.ident}</Text>
          )
      }
    }

    render() {
      return(
        <Navigator
          initialRoute = {{ident: 'TitleScreen'}}
          ref = 'appNavigator'
          style = {styles.NavigatorStyle}
          renderScene = {this._renderScreen}/>
        )
    }
}

const styles = StyleSheet.create({
  NavigatorStyle: {

  }
})

AppRegistry.registerComponent('pinchitapp', () => pinchitapp)
