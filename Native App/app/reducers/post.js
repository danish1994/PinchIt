import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loadPosts = createReducer({
  selectedTab: 'TitleScreen'
},{
  [types.LOAD_POST](state, action){
    return {
      selectedTab: 'PostScreen'
    }
  }
})
