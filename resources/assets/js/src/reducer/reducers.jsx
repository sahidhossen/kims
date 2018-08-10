import { combineReducers } from 'redux'
import locationReducer from './location'
import users from './userReducer'
import oauth from './oauthReducer'
export const makeRootReducer = asyncReducers => {
    return combineReducers({
        // Add sync reducers here
        users,
        oauth,
        location: locationReducer,
        ...asyncReducers
    })
}

export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer