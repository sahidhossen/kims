import * as constants from '../actionType'

const kitTypes = function reducer(
    state = {
        kitTypes: [],
        fetching: false,
        fetched: false,
        type_problem_fetching: false,
        type_problem_fetched: false,
        error: null
    },
    action
) {
    switch (action.type) {
        case constants.FETCHING_KIT_TYPE: {
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
        }
        case constants.FETCH_KIT_TYPE: {
            return {
                ...state,
                fetching: true,
                error: null,
                fetched: true,
                kitTypes: action.payload,
            }
        }
        case constants.FETCHING_KIT_TYPE_PROBLEM: {
            return {
                ...state,
                type_problem_fetching: true,
                type_problem_fetched: false,
            }
        }
        case constants.FETCHED_KIT_TYPE_PROBLEM: {
            return {
                ...state,
                type_problem_fetching: false,
                type_problem_fetched: true,
                kitTypes: action.payload
            }
        }
    }
    return state
}
export default kitTypes