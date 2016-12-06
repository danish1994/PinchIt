'use strict'

import React, {Component} from 'react'
import {DrawerLayoutAndroid, Button, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {ActionCreators} from '../actions'

import AppNavigator from '../navigation/AppNavigator'

import ViewContainer from '../component/ViewContainer'

import Home from './Home'


class AppContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      return(
          <Home { ...this.props } />
        )
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer)
