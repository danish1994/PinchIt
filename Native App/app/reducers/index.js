import { combineReducers } from 'redux'

import * as PostReducers from './post'

export default combineReducers(Object.assign({},
  PostReducers
))
