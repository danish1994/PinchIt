'use strict'

import React, {Component} from 'react'
import {AppRegistry, DrawerLayoutAndroid, Button} from 'react-native'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReduxers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import AppNavigator from './app/navigation/AppNavigator'

import ViewContainer from './app/component/ViewContainer'

class pinchitapp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          selectedTab: 'TitleScreen'
        }
    }

    render() {
      var _renderDrawer = (
        <Button
          onPress = {() => this.setState({selectedTab: 'PostScreen'},function(){
            console.log(this.state)
          })}
          title = 'Explore'
        />
        // <AppNavigator
        //   initialRoute = {{ident: 'NavigationDrawer'}}/>
      )

      return(
        <DrawerLayoutAndroid
          drawerBackgroundColor="rgba(0,0,0,0.6)"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => _renderDrawer}>
          <AppNavigator
            initialRoute = {{ident: this.state.selectedTab}}/>
        </DrawerLayoutAndroid>
        )
    }
}

AppRegistry.registerComponent('pinchitapp', () => pinchitapp)
