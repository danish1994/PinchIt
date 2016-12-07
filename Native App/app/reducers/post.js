import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const showPosts = createReducer({},{
  [types.LOAD_POST](state, action){
    return {
      selectedTab: 'PostScreen'
    }
  }
})
