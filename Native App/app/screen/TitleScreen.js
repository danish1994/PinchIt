'use strict'

import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native'
import {connect} from 'react-redux'

import ViewContainer from '../component/ViewContainer'

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
            PinchIt
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
