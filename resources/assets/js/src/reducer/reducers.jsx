import { combineReducers } from 'redux'
import locationReducer from './location'
import users from './userReducer'

export const makeRootReducer = asyncReducers => {
    return combineReducers({
        // Add sync reducers here
        users,
        location: locationReducer,
        ...asyncReducers
    })
}

export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer