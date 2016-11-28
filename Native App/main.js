'use strict'

import React, {Component, PropTypes} from 'react'
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight, Alert, Navigator} from 'react-native'

import Post from './post'

export default class Main extends Component {
  constructor(props) {
      super(props)
      this.posts = []
  }
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Post ' + 0, index: 0 }}
        renderScene={(route, navigator) =>
          <Post
            title={route.title}

            // Function to call when a new scene should be displayed
            onForward={ () => {
              const nextIndex = route.index + 1
              navigator.push({
                title: 'Post ' + nextIndex,
                index: nextIndex,
              })
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop()
              }
            }}
          />
        }
      />
    )
  }
}
