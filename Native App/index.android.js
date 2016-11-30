'use strict'

import React, {Component} from 'react'
import {AppRegistry, DrawerLayoutAndroid} from 'react-native'

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
        <AppNavigator
          initialRoute = {{ident: 'NavigationDrawer'}}/>
      )

      return(
        <DrawerLayoutAndroid
          drawerBackgroundColor="rgba(255,255,255,0.6)"
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
