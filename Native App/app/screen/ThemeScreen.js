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

class ThemeScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={[styles.heading, this.props.theme]}>
            Themes
          </Text>
          <Button
            onPress = {() => this.props.setTheme('light')}
            title = 'Light'
            style = {styles.button}
          />
          <Button
            onPress = {() => this.props.setTheme('dark')}
            title = 'Dark'
            style = {styles.button}
          />
        </View>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  heading: {
    fontSize: windowHeight/20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    fontSize: windowHeight/30,
    margin: 20,
    textAlign: 'justify'
  }
})


function mapStateToProps(state){
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(ThemeScreen)
