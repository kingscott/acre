import {compose, createStore} from 'redux'
import {devtools, persistState} from 'redux-devtools'
import reducer from './reducer/reducer'

export default function configureStore (initialState) {
  return createStore(reducer, initialState)
}
