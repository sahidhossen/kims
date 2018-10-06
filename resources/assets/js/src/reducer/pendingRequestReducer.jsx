import * as constants from '../actionType'

const pendingRequest = function reducer(
    state = {
        pendingRequest: [],
        fetching: false,
        fetched: false,
        fetch_task_complete: false,
        fetched_task_complete: false,
        task_message: '',
        error: null
    },
    action
) {
    switch (action.type) {
        case constants.FETCHING_PENDING_REQUEST: {
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
        }
        case constants.FETCHING_TASK_COMPLETE: {
            return {
                ...state,
                fetch_task_complete: true,
                fetched_task_complete: false,
            }
        }
        case constants.FETCH_TASK_COMPLETE: {
            return {
                ...state,
                fetch_task_complete: false,
                fetched_task_complete: true,
                task_message:action.payload
            }
        }
        case constants.REMOVE_TASK_COMPLETE: {
            return {
                ...state,
                task_message:''
            }
        }
        case constants.FETCH_PENDING_REQUEST: {
            return {
                ...state,
                fetching: false,
                error: null,
                fetched: true,
                pendingRequest: action.payload,
            }
        }
    }
    return state
}
export default pendingRequest