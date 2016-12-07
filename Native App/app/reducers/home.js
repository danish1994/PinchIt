import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const selectedScreen = createReducer('TitleScreen',{
  [types.ACTIVE_SCREEN](state, action){
    return action.key
  }
})

export const theme = createReducer({
  backgroundColor: '#111111',
  color: '#bbbbbb'
},{
  [types.THEME](state, action){
    switch (action.theme) {
      case 'light':
        return {
          backgroundColor: '#eeeeee',
          color: '#111111'
        }
      case 'dark':
        return {
          backgroundColor: '#111111',
          color: '#eeeeee'
        }
      default:
        return {
          backgroundColor: '#111111',
          color: '#eeeeee'
        }
    }
  }
})

export const drawerTheme = createReducer('rgba(0,0,0,0.3)',{
  [types.THEME](state, action){
    switch (action.theme) {
      case 'light':
        return 'rgba(255,255,255,0.5)'
      case 'dark':
        return 'rgba(0,0,0,0.5)'
      default:
        return 'rgba(0,0,0,0.5)'
    }
  }
})
