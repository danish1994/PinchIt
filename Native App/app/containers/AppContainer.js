'use strict'

import React, {Component} from 'react'
import {DrawerLayoutAndroid, Button, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {ActionCreators} from '../actions'

import AppNavigator from '../navigation/AppNavigator'

import ViewContainer from '../component/ViewContainer'



class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          selectedTab: 'TitleScreen'
        }
    }

    render() {
      var _renderDrawer = (
        <Button
          onPress = {() => this.props.loadPosts()}
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
            initialRoute = {{ident: this.props.selectedTab}}/>
        </DrawerLayoutAndroid>

        // <View>
        //   <Text>SelectedTab {this.props.selectedTab}</Text>
        //   <Button
        //     onPress = {() => this.props.loadPosts()}
        //     title = 'Explore'
        //   />
        // </View>
        )
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect((state) => { return {
  selectedTab: state.loadPosts.selectedTab
} }, mapDispatchToProps)(AppContainer)
