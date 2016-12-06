'use strict'

import React, {Component, PropTypes} from 'react'
import {Dimensions, StyleSheet, Text, View, TouchableHighlight, Alert, Navigator, Image, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import ViewContainer from '../component/ViewContainer'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class PostScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style = {{flex: 1}}>
          <Image
            style={styles.image}
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
              <Button
                onPress = {(event) => this._previousPost()}
                title = ' < '
                style = {styles.button}
              />
              <View style={{flex:2}} />
              <Button
                onPress = {(event) => this._nextPost()}
                title = ' > '
                style = {styles.button}
              />
            </View>
          </View>
        </View>
      </ViewContainer>
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
    fontSize: windowHeight/20
  },
  button: {
    flex: 2,
    backgroundColor: '#0000ff',
    justifyContent: 'center',
    alignItems : 'stretch',
  },
  buttonText:{
    textAlign: 'center',
    color: '#bbbbbb',
    fontSize: windowHeight/30
  },
  post: {
    textAlign: 'left',
    color: '#bbbbbb',
    fontSize: windowHeight/30,
    alignSelf : 'stretch',
  },
  image: {
    resizeMode: 'stretch',
    flex: 1
  }
})

exports.module = PostScreen
