import { AsyncStorage } from 'react-native'

export const loadState = () => {
  try {
    const serializedState = AsyncStorage.getItem('state',()=>{
      console.log('loaded')
    });
    console.log(serializedState)
    if (serializedState === null){
      return undefined
    }
    return JSON.parse(serializedState)
  }catch(err){
    console.log(err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    AsyncStorage.setItem('state', serializedState).then(()=>{
      console.log('saved')
    })
  }catch(err){
    console.log(err)
  }
}
