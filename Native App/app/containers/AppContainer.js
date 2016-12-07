'use strict'

import React, { Component } from 'react'
import {
  DrawerLayoutAndroid,
  Button,
  View
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'

import AppNavigator from './AppNavigator'

class AppContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      var _renderDrawer = (
        <View>
          <Button
            onPress = {() => this._activeScreen('TitleScreen')}
            title = 'Home'
          />
          <Button
            onPress = {() => this._activeScreen('PostScreen')}
            title = 'Posts'
          />
          <Button
            onPress = {() => this._activeScreen('AboutScreen')}
            title = 'About Us'
          />
          <Button
            onPress = {() => this._activeScreen('ThemeScreen')}
            title = 'Themes'
          />
        </View>
      )


      return(
        <DrawerLayoutAndroid
          drawerBackgroundColor= {this.props.drawerTheme}
          drawerWidth={300}
          drawerPosition={ DrawerLayoutAndroid.positions.Left }
          renderNavigationView={() => _renderDrawer}
          ref={'drawer'}>
          <AppNavigator
            { ...this.props } />
        </DrawerLayoutAndroid>
        )
    }

    _activeScreen(key){
      this.props.activeScreen(key)
      this.refs['drawer'].closeDrawer(0)

    }
}

function mapStateToProps(state){
  return {
    selectedScreen: state.selectedScreen,
    drawerTheme: state.drawerTheme
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
