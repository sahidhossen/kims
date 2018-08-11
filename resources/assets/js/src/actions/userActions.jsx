import * as constants from '../actionType'
import axios from 'axios'

import { CLIENT_SECRET, CLIENT_ID, GRANT_TYPE } from '../constants';


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


export const getUserRole = () => dispatch => {
    console.log("axios: ", window.axios.defaults.headers)
    axios.get('/api/get_roles')
    .then(function (response) {
         console.log("res: ", response)
        // dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload:response.data });
    })
    .catch(function (error) {
        console.log(error);
        // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
    });
}


export const fetchOauthToken = user  => dispatch => {
    user.client_id = CLIENT_ID;
    user.client_secret = CLIENT_SECRET;
    user.grant_type = GRANT_TYPE;

    dispatch({
        type: constants.FETCH_OAUTH_FETCHING
    })

    axios.post('/oauth/token', user)
        .then(function (response) {
            localStorage.setItem('kim_auth', JSON.stringify(response.data) )
            dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload:response.data });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}
