import * as constants from '../actionType'

export const UserLogin = data => dispatch => {
    dispatch({
        type: constants.USER_LOGGING_IN
    })
    // Wait 2 seconds before "logging in"
    setTimeout(() => {
        dispatch({
            type: constants.USER_LOGGED_IN,
            payload: true
        })
    }, 2000)
}