import * as constants from '../actionType'

const users = function reducer(
    state = {
        users: [],
        fetching: false,
        fetched: false,
        fetchingLogin: false,
        isLoggedIn: false,
        roles:[],
        fetchingRole: false,
        fetchedRole: false,
        error: null
    },
    action
) {
    switch (action.type) {
        case 'FETCH_USER_FULFILLED': {
            return {
                ...state,
                fetching: true,
                error: null,
                fetched: true,
                users: action.payload
            }
        }
        case 'FETCH_USER_ROLE': {
            return {
                ...state,
                fetchingRole: true,
                error: null,
                fetchedRole: true,
                roles: action.payload
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

    }
    return state
}
export default users