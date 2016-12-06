'use strict'

import React, {Component} from 'react'
import {DrawerLayoutAndroid, Button, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {ActionCreators} from '../actions'

import AppNavigator from './AppNavigator'

import ViewContainer from '../component/ViewContainer'

class AppContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      var _renderDrawer = (
        <View>
          <Button
            onPress = {() => this.props.activeScreen('TitleScreen')}
            title = 'Home'
          />
          <Button
            onPress = {() => this.props.activeScreen('PostScreen')}
            title = 'Posts'
          />
          <Button
            onPress = {() => this.props.activeScreen('AboutScreen')}
            title = 'About Us'
          />
        </View>
      )

      return(
        <DrawerLayoutAndroid
          drawerBackgroundColor="rgba(0,0,0,0.6)"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => _renderDrawer}>
          <AppNavigator
            { ...this.props } />
        </DrawerLayoutAndroid>
        )
    }
}

function mapStateToProps(state){
  return {
    selectedScreen: state.selectedScreen
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
