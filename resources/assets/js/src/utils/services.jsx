import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import * as constants from '../actionType'

export const userIsAuthenticated = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/login',
    // If selector is true, wrapper will not redirect
    // For example let's check that state contains user data
    // authenticatedSelector: state => state.oauth.fetched,
    authenticatedSelector: (state, props) => {
        if( state.oauth.oauth.access_token !== null ) {
            return true
        }

        let current_oauth  = localStorage.getItem('kim_auth');
        if ( current_oauth !== null && current_oauth.length > 0 ) {
            current_oauth = JSON.parse(current_oauth);
            props.dispatch({ type: constants.FETCH_OAUTH_FETCHED, payload: current_oauth });
            window.axios.defaults.headers.common['Authorization'] = current_oauth.token_type +" "+ current_oauth.access_token;
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
        window.axios.defaults.headers.common['Authorization'] = current_oauth.token_type +" "+ current_oauth.access_token;
        return true;
    } else {
        return null
    }
}