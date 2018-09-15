import * as constants from '../actionType'
import axios from 'axios'

import { CLIENT_SECRET, CLIENT_ID, GRANT_TYPE } from '../constants';



export const fetchUser = () => dispatch => {
    axios.get('/api/kit_users' )
        .then(function (response) {
            // console.log("user: ", response.data )
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

export const fetchUserByCompany = () => dispatch => {
    axios.get('/api/kit_user_by_company' )
        .then(function (response) {
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
    dispatch({ type: constants.FETCHING_ADD_USER })
    axios.post('/api/kit_user_register', data )
        .then(function (response) {
            if( response.data.success === true ) {
                let store = getState()
                let users = [...store.users.users]
                users.push( response.data.data )
                dispatch({type: constants.FETCHED_ADD_USER, payload: users });
            }else {
                console.log("user error: ", response)
                dispatch({type: constants.REJECT_USER_REGISTER, payload: response.data.message });
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

            if( response.data.success === true ) {
                let store = getState()
                let { users } = store
                const currentItems = [...users.currentItems]
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

    axios.get('/api/web_kit_items_by_solder_id', {params: data } )
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
            console.log("yn auth", response)
            // localStorage.setItem('kim_auth', JSON.stringify(response.data) )
            // dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload:response.data });
            dispatch(fetchAuthUser(response.data))
        })
        .catch(function (error) {
            console.log("error log: ", error)
            dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const logout = () => dispatch => {
    localStorage.removeItem('kim_auth')
    dispatch({ type: constants.FETCH_OAUTH_LOGOUT })
}

export const fetchAuthUser = (authResponse=null) => (dispatch, getState) =>{
    let oauth = null;
     if(authResponse !== null ){
        axios.defaults.headers.common['Authorization'] = authResponse.token_type +" "+ authResponse.access_token;
        axios.defaults.headers.post['Accept'] = 'application/json';
        oauth = authResponse
     }else{
        const store = getState(); 
        oauth = {...store.oauth}
     }
   
    axios.get('/api/kit_solder')
    .then(function (response) {
        if( response.data.success === true ){ 
            oauth.user = response.data.data 
            if(authResponse !== null )
                localStorage.setItem('kim_auth', JSON.stringify(oauth) )
            dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload:oauth, user: response.data.data });
        }
    })
    .catch(function (error) {
        dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
    });
}

export const retriveAuthUser = () => dispatch => {
    let current_oauth  = localStorage.getItem('kim_auth');
    if ( current_oauth !== null && current_oauth.length > 0 ) {
        current_oauth = JSON.parse(current_oauth);
        const user = {...current_oauth.user}
        delete current_oauth.user
        dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload: current_oauth, user:user });
        delete current_oauth.user
    }
}