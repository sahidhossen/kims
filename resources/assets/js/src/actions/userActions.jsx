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


export const fetchUser = () => dispatch => {
    axios.get('/api/kit_users' )
        .then(function (response) {
            console.log("user: ", response.data )
            if( response.data.success === true ) {
                dispatch({type: constants.FETCH_USER, payload: response.data.data });
            }else {
                console.log("error: ", response.data.message )
            }
        })
        .catch(function (error) {
            console.log("role error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const fetchUserById = data => dispatch => {
    axios.get('/api/kit_user_by_id', { params: data } )
        .then(function (response) {
            if( response.data.success === true ) {
                dispatch({type: constants.FETCH_SINGLE_USER, payload: response.data.data });
            }else {
                console.log("error: ", response.data.message )
                dispatch({type: constants.REJECT_SINGLE_USER, payload: response.data.message });
            }
        })
        .catch(function (error) {
            console.log("role error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const addUser = data => (dispatch, getState) => {
    axios.post('/api/kit_user_register', data )
        .then(function (response) {
            if( response.data.success === true ) {
                let store = getState()
                let { users: {users} } = store
                users.push( response.data.data )
                dispatch({type: constants.FETCH_USER, payload: users });
            }else {
                console.log("error: ", response.data.message )
            }
        })
        .catch(function (error) {
            console.log("role error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const assignItemToSolder = data => (dispatch, getState ) => {
    axios.post('/api/assign_kit_item', data )
        .then(function (response) {
            console.log("assign: ", response)
            if( response.data.success === true ) {
                let store = getState()
                let { users: {currentItems} } = store
                currentItems.push( response.data.data )
                dispatch({type: constants.FETCH_USER_ITEMS, payload: currentItems });
            }else {
                console.log("error: ", response.data.message )
                dispatch({type: constants.REJECT_USER_ITEMS, payload: response.data.message });
            }
        })
        .catch(function (error) {
            console.log("role error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const getAssignedItems = data => dispatch => {

    axios.get('/api/get_kit_solder_items_by_id', {params: data } )
        .then(function (response) {
            if( response.data.success === true ) {
                dispatch({type: constants.FETCH_USER_ITEMS, payload: response.data.data });
            }else {
                console.log("error: ", response.data.message )
                dispatch({type: constants.REJECT_USER_ITEMS, payload: response.data.message });
            }
        })
        .catch(function (error) {
            console.log("role error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}


export const getUserRole = () => dispatch => {
    dispatch({
        type: constants.FETCHING_USER_ROLE
    })
    axios.get('/api/get_roles')
    .then(function (response) {
        dispatch({ type: constants.FETCH_USER_ROLE, payload:response.data.data });
    })
    .catch(function (error) {
        console.log("role error: ",error);
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

