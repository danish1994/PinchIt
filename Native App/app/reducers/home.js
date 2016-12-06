import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const selectedScreen = createReducer('TitleScreen',{
  [types.ACTIVE_SCREEN](state, action){
    console.log(action)
    return action.key
  }
})
