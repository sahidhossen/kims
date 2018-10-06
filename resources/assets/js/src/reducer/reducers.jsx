import { combineReducers } from 'redux'
import locationReducer from './location'
import users from './userReducer'
import roles from './roleReducer'
import oauth from './oauthReducer'
import kitControllers from './kitControllerReducer'
import kitTypes from './kitTypesReducer'
import kitItems from './kitItemReducer'
import condemnations from './condemnationReducer'
import pendingRequest from './pendingRequestReducer'

export const makeRootReducer = asyncReducers => {
    return combineReducers({
        // Add sync reducers here
        condemnations,
        kitItems,
        kitTypes,
        kitControllers,
        pendingRequest,
        users,
        roles,
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