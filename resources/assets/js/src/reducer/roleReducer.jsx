import * as constants from '../actionType'

const roles = function reducer(
    state = {
        fetching: false,
        fetched: false,
        roles:[],
        error: null
    },
    action
) {
    switch (action.type) {

        case constants.FETCHING_USER_ROLE: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case constants.FETCH_USER_ROLE: {
            return {
                ...state,
                fetching: false,
                error: null,
                fetched: true,
                roles: action.payload
            }
        }

    }
    return state
}
export default roles