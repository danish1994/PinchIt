'use strict'

import React, {Component} from 'react'
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Alert, Navigator} from 'react-native'

import TitleScreen from './app/screen/TitleScreen'
import PostScreen from './app/screen/PostScreen'

import ViewContainer from './app/component/ViewContainer'

class pinchitapp extends Component {
    constructor(props) {
        super(props)
    }

    _renderScreen(route, navigator){
      var globalNavigatorProps = { navigator }

      switch(route.ident){
        case 'TitleScreen':
          return (
            <TitleScreen
              { ...globalNavigatorProps } />
          )
        case 'PostScreen':
          if(route.post.index < 0){
            return(
              <Text> No More Post Available. (Under Development) </Text>
            )
          }else{
            return(
              <PostScreen
                { ...globalNavigatorProps }
                post = {route.post} />
            )
          }
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
          renderScene = {this._renderScreen}
          configureScene={(route) => ({
            ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight })}
          />
        )
    }
}

const styles = StyleSheet.create({
  NavigatorStyle: {

  }
})

AppRegistry.registerComponent('pinchitapp', () => pinchitapp)
