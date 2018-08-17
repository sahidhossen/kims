import * as constants from '../actionType'

const users = function reducer(
    state = {
        users: [],
        user: null,
        currentItems:[],
        fetching: false,
        fetched: false,
        fetchingLogin: false,
        isLoggedIn: false,
        error: null
    },
    action
) {
    switch (action.type) {
        case constants.FETCHING_USER: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case constants.FETCH_USER: {
            return {
                ...state,
                fetching: false,
                error: null,
                fetched: true,
                users: action.payload
            }
        }
        case constants.FETCH_SINGLE_USER: {
            return {
                ...state,
                fetching: false,
                error: null,
                fetched: true,
                user: action.payload
            }
        }
        case constants.REJECT_SINGLE_USER: {
            return {
                ...state,
                user: null,
                error: action.payload
            }
        }
        case constants.FETCH_USER_ITEMS: {
            return {
                ...state,
                fetching: false,
                error: null,
                fetched: true,
                currentItems: action.payload
            }
        }
        case constants.REJECT_USER_ITEMS: {
            return {
                ...state,
                currentItems: [],
                error: action.payload
            }
        }
        case constants.USER_LOGGING_IN : {
            return {
                ...state,
                fetchingLogin: true
            }
        }
        case constants.USER_LOGGED_IN : {
            return {
                ...state,
                isLoggedIn: action.payload
            }
        }
        case constants.USER_LOGGED_OUT : {
            return {
                ...state,
                fetchingLogin: false,
                isLoggedIn: action.payload
            }
        }

    }
    return state
}
export default users