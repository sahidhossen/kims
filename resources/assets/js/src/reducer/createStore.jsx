import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

export default (initialState = {}) => {
    // ======================================================
    // Window Vars Config
    // ======================================================
    let version = version

    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [
        // thunk.withExtraArgument(getFirebase)
        thunk
        // This is where you add other middleware like redux-observable
    ]

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []

    // Initialize Firebase
    // firebase.initializeApp(fbConfig)
    // Initialize Firestore
    // firebase.firestore()

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    store.asyncReducers = {}

    // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
    // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    return store
}