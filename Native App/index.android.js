'use strict'

import React, {Component} from 'react'
import {AppRegistry, StyleSheet, Text} from 'react-native'

import AppNavigator from './app/navigation/AppNavigator'

class pinchitapp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      return(
        <AppNavigator
          initialRoute = {{ident: 'TitleScreen'}}/>
        )
    }
}

const styles = StyleSheet.create({
  NavigatorStyle: {

  }
})

AppRegistry.registerComponent('pinchitapp', () => pinchitapp)
