import { combineReducers } from 'redux'

import * as PostReducers from './post'
import * as HomeReducers from './home'

export default combineReducers(Object.assign({},
  PostReducers,
  HomeReducers
))
