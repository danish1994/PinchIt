'use strict'

import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, TouchableHighlight, Alert, Navigator,Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Post extends Component {
  static get defaultProps() {
    return {
      title: 'post'
    }
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
            <Text style={styles.heading}>Current Scene: { this.props.title }</Text>
          </View>
          <View style = {{flex: 4 , alignItems: 'stretch'}}>
            <Text style={styles.post}>Aliquam convallis, ligula nec molestie interdum, tellus enim commodo mauris, sed bibendum ex elit a felis. Sed fringilla iaculis varius. Etiam arcu nibh, consequat at mattis eget, rutrum non elit. Nam at euismod turpis, mattis auctor nisi. Nam nec molestie ex. Sed eget dolor a ipsum egestas venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor magna lacus.</Text>
          </View>
          <View style = {{flex: 1 , alignItems: 'stretch'}}>
            <View style={{flexDirection : 'row', justifyContent: 'space-between',flex: 1}}>
              <TouchableHighlight style={styles.button} onPress={this.props.onBack}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableHighlight>
              <View style={{flex:2}} />
              <TouchableHighlight style={styles.button} onPress={this.props.onForward}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
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
