'use strict'

import React, {Component} from 'react'
import { StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import AboutScreen from '../screen/AboutScreen'
import TitleScreen from '../screen/TitleScreen'
import PostScreen from '../screen/PostScreen'


class AppNavigator extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      let Scene = null;
      if (this.props.selectedScreen === 'TitleScreen') { Scene = TitleScreen }
      if (this.props.selectedScreen === 'PostScreen') { Scene = PostScreen }
      if (this.props.selectedScreen === 'AboutScreen') { Scene = AboutScreen }

      return(
        <Scene {...this.props} />
      )
    }
}

const styles = StyleSheet.create({
  NavigatorStyle: {

  }
})


function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(AppNavigator)
