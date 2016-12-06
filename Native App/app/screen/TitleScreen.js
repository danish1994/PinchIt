'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native'

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class TitleScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Test App
          </Text>
          <Button
            onPress = {() => this.props.activeScreen('PostScreen')}
            title = 'Explore'
            style = {styles.button}
          />
        </View>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: '#eeeeee',
    height: 70
  },
  button: {
    height: 60,
    backgroundColor: '#0000ff',
    alignSelf : 'stretch',
    justifyContent: 'center',
    alignItems : 'center',
    fontSize: 30
  }
})


function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(TitleScreen)
