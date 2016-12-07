'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PostScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style = {styles.container}>
          <Image
            style={styles.image}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
        <View style = {{flex: 1 , alignItems: 'stretch'}}>
          <View style = {{flex: 1 , alignItems: 'stretch'}}>
            <Text style={[styles.heading, this.props.theme]}>Title</Text>
          </View>
          <View style = {{flex: 4 , alignItems: 'stretch'}}>
            <Text style={[styles.post, this.props.theme]}>Aliquam convallis, ligula nec molestie interdum, tellus enim commodo mauris, sed bibendum ex elit a felis. Sed fringilla iaculis varius. Etiam arcu nibh, consequat at mattis eget, rutrum non elit. Nam at euismod turpis, mattis auctor nisi. Nam nec molestie ex. Sed eget dolor a ipsum egestas venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor magna lacus.</Text>
          </View>
          <View style = {{flex: 1 , alignItems: 'stretch'}}>
            <View style={{flexDirection : 'row', justifyContent: 'space-between',flex: 1}}>
              <Button
                onPress = {() => this.props.activeScreen('PostScreen')}
                title = ' < '
                style = {styles.button}
              />
              <View style={{flex:2}} />
              <Button
                onPress = {() => this.props.activeScreen('PostScreen')}
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

  }

  _nextPost() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  heading: {
    textAlign: 'left',
    fontSize: windowHeight/20
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems : 'stretch',
  },
  buttonText:{
    textAlign: 'center',
    fontSize: windowHeight/30
  },
  post: {
    textAlign: 'left',
    fontSize: windowHeight/30,
    alignSelf : 'stretch',
  },
  image: {
    resizeMode: 'stretch',
    flex: 1
  }
})

function mapStateToProps(state){
  return {
      theme: state.theme
  }
}

export default connect(mapStateToProps)(PostScreen)
