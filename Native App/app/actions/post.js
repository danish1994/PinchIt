import * as types from './types'
import Api from '../lib/api'

export function loadPosts(){
  const params = [
    'type=male'
  ].join('&')
  Api.get(`http://wconnect-pcj.rhcloud.com/class/?${params}`).then(res => {
    console.log(res)
  }).catch( (err) => {
    console.log(err)
  })
  return{
    type: types.LOAD_POST,
  }
}
