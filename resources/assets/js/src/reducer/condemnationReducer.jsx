import * as constants from '../actionType'

const condemnations = function reducer(
    state = {
        condemnation: [],
        fetching: false,
        fetched: false,
        error: null
    },
    action
) {
    switch (action.type) {
        case constants.FETCHING_CONDEMNATION: {
            return {
                ...state,
                error: null,
                fetching: true,
                fetched: false,
            }
        }
        case constants.FETCH_CONDEMNATION: {
            return {
                ...state,
                fetching: true,
                error: null,
                fetched: true,
                condemnation: action.payload,
            }
        }
        case constants.REJECT_CONDEMNATION: {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: action.payload
            }
        }
    }
    return state
}
export default condemnations