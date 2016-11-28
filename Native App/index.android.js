'use strict'

import React, {Component} from 'react'
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native'

import Main from './main'
import Title from './title'

import ViewContainer from './app/component/ViewContainer'

class pinchitapp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showTitle: false
        }
        // setInterval(() => {
        //   this.setState({ showTitle: !this.state.showTitle })
        // }, 1000)
    }
    render() {
        if (this.state.showTitle)
          return (
            <View style={styles.container}>
              <Text style={styles.welcome}>
                PinchIt
              </Text>
              <TouchableHighlight style={styles.button}
                onPress={this.clickFucntion}>
                <Text style={styles.heading1}>Explore!</Text>
              </TouchableHighlight>
            </View>
          )
        else {
          return (
            // <ViewContainer>
            //   <Text>Hello From View container</Text>
            // </ViewContainer>
            <Main />
          )
        }
    }

    clickFucntion(){
      // Alert.alert(
      //   'PinchIt',
      //   'App Still Under Development',
      //   [
      //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ]
      // )

      console.log(this)
      // this.setState({ showTitle: false })

      // fetch('http://localhost:8888/post/',{'method':'GET'})
      // .then((response)=>response.json())
      // .then((responseData)=>{
      //   console.log(responseData)
      //   Alert.alert(
      //     'Alert Title',
      //     JSON.stringify(responseData)
      //   )
      // })
      // .done()
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: '#eeeeee',
    height: 70
  },
  heading1: {
    textAlign: 'center',
    color: '#bbbbbb',
    fontSize: 30,
    height: 50
  },
  button: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#0000ff',
    alignSelf : 'stretch',
    justifyContent: 'center',
    alignItems : 'center'
  }
})

AppRegistry.registerComponent('pinchitapp', () => pinchitapp)
