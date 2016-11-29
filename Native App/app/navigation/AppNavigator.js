'use strict'

import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, Navigator} from 'react-native'

import TitleScreen from '../screen/TitleScreen'
import PostScreen from '../screen/PostScreen'

import ViewContainer from '../component/ViewContainer'

import LoadData from '../utility/LoadData'

class AppNavigator extends Component {
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
        case 'LoadData':
          return (
            <LoadData
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
          initialRoute = {this.props.initialRoute}
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

module.exports = AppNavigator
