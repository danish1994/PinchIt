import * as types from './types'

export function activeScreen(key){
  return {
    type: types.ACTIVE_SCREEN,
    key: key
  }
}

export function setTheme(theme){
  return {
    type: types.THEME,
    theme: theme
  }
}
