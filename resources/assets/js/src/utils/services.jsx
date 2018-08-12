import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import * as constants from '../actionType'
import axios from 'axios';

export const userIsAuthenticated = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/login',
    // If selector is true, wrapper will not redirect
    // For example let's check that state contains user data
    // authenticatedSelector: state => state.oauth.fetched,
    authenticatedSelector: (state, props) => {
        if( state.oauth.oauth.access_token !== null ) {
            axios.defaults.headers.common['Authorization'] = state.oauth.oauth.token_type +" "+ state.oauth.oauth.access_token;
            axios.defaults.headers.post['Accept'] = 'application/json';
            return true
        }

        let current_oauth  = localStorage.getItem('kim_auth');
        if ( current_oauth !== null && current_oauth.length > 0 ) {
            current_oauth = JSON.parse(current_oauth);
            props.dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload: current_oauth });
            axios.defaults.headers.common['Authorization'] = current_oauth.token_type +" "+ current_oauth.access_token;
            axios.defaults.headers.post['Accept'] = 'application/json';
            return true
        }
    	return false
    },
    // A nice display name for this check
    wrapperDisplayName: 'UserIsAuthenticated'
})


/**
 * @return {null}
 */
export const Authentication = props => {
    let current_oauth  = localStorage.getItem('kim_auth');
    if ( current_oauth !== null && current_oauth.length > 0 ) {
        current_oauth = JSON.parse( current_oauth );
        props.dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload: current_oauth });
        axios.defaults.headers.common['Authorization'] = current_oauth.token_type +" "+ current_oauth.access_token;
        axios.defaults.headers.post['Accept'] = 'application/json';
        return true;
    } else {
        return null
    }
}