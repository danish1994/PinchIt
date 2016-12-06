import * as types from './types'

export function activeScreen(key){
  return{
    type: types.ACTIVE_SCREEN,
    key: key
  }
}
