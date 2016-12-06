import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const activeScreen = createReducer('TitleScreen',{
  [types.ACTIVE_SCREEN](state, action){
    return 'PostScreen'
  }
})
