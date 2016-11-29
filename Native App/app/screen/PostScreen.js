'use strict'

import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, TouchableHighlight, Alert, Navigator,Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class PostScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {{flex: 1}}>
        <Image
          style={{width: 360, height: 300}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
        </View>
        <View style = {{flex: 1 , alignItems: 'stretch'}}>
          <View style = {{flex: 1 , alignItems: 'stretch'}}>
            <Text style={styles.heading}>{ this.props.post.title }</Text>
          </View>
          <View style = {{flex: 4 , alignItems: 'stretch'}}>
            <Text style={styles.post}>Aliquam convallis, ligula nec molestie interdum, tellus enim commodo mauris, sed bibendum ex elit a felis. Sed fringilla iaculis varius. Etiam arcu nibh, consequat at mattis eget, rutrum non elit. Nam at euismod turpis, mattis auctor nisi. Nam nec molestie ex. Sed eget dolor a ipsum egestas venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor magna lacus.</Text>
          </View>
          <View style = {{flex: 1 , alignItems: 'stretch'}}>
            <View style={{flexDirection : 'row', justifyContent: 'space-between',flex: 1}}>
              <TouchableHighlight style={styles.button} onPress={(event) => this._previousPost() }>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableHighlight>
              <View style={{flex:2}} />
              <TouchableHighlight style={styles.button} onPress={(event) => this._nextPost() }>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _previousPost() {
    this.props.navigator.push({
      ident: 'PostScreen',
      post: {
        title: 'Post ' + (this.props.post.index - 1),
        index: this.props.post.index - 1
      },
      sceneConfig: Navigator.SceneConfigs.PushFromLeft
    })
  }

  _nextPost() {
    this.props.navigator.push({
      ident: 'PostScreen',
      post: {
        title: 'Post ' + (this.props.post.index + 1),
        index: this.props.post.index + 1
      },
      sceneConfig: Navigator.SceneConfigs.PushFromRight
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#111111',
  },
  heading: {
    textAlign: 'left',
    color: '#bbbbbb',
    fontSize: 25
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#0000ff',
    alignSelf : 'stretch',
    justifyContent: 'center',
    alignItems : 'center',
  },
  buttonText:{
    textAlign: 'center',
    color: '#bbbbbb',
    fontSize: 15
  },
  post: {
    textAlign: 'left',
    color: '#bbbbbb',
    fontSize: 18,
    alignSelf : 'stretch',
  }
})

exports.module = PostScreen
