'use strict'

import React, { Component } from 'react'
import { Navigator, Text } from 'react-native'

class LoadData extends Component{
  constructor(props){
    super(props)
  }

  render(){
    var data = this._loadData()
    console.log(data)
    return(
      <Text>Loading Data</Text>
    )
  }

  async _loadData(){
    try{
      let response = await fetch('https://stitchmi.com/api/v1/baseProduct/?type=male', {
                              method: 'GET'
                            })

      let responseJson = await response.json()

      return responseJson.payload
    }catch(err){
      console.log(err)
    }
  }

  _navigateToNextScreen(){
    this.props.navigator.push({
      ident: 'DataLoaded'
    })
  }

}

module.exports = LoadData
