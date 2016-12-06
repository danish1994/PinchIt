'use strict'

import React, {Component} from 'react'
import {DrawerLayoutAndroid, Button, Text, View} from 'react-native'
import {connect} from 'react-redux'

import AppNavigator from '../navigation/AppNavigator'

import ViewContainer from '../component/ViewContainer'



class Home extends Component {
    constructor(props) {
        super(props)
    }

    searchPressed() {
      this.props.activeScreen().then( (res) => {
        console.log(res)
      });
    }

    render() {
      var _renderDrawer = (
        <Button
          onPress = {() => this.props.activeScreen()}
          title = 'Explore'
        />
        // <AppNavigator
        //   initialRoute = {{ident: 'NavigationDrawer'}}/>
      )

      console.log(this.props)

      return(
        <DrawerLayoutAndroid
          drawerBackgroundColor="rgba(0,0,0,0.6)"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => _renderDrawer}>
          <AppNavigator
            initialRoute = {{ident: this.props.activeScreen}}/>
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

function mapStateToProps(state){
  console.log(state)
  return {
    activeScreen: state.activeScreen
  }
}

export default connect(mapStateToProps)(Home)
