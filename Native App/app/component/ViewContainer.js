'use strict'

import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

class ViewContainer extends Component {
  render() {
    return (
      <View style={styles.ViewContainer}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#111111'
  }
})

module.exports = ViewContainer
