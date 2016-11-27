'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Navigator
} from 'react-native';

import Main from './main'
import Title from './title'

export default class pinchitapp extends Component {
  constructor(props) {
    super(props);
    this.state = { showTitle: true };
  }
  render() {
    return (
      <Title />
      // <Main />
    );
  }


}

AppRegistry.registerComponent('pinchitapp', () => pinchitapp);
