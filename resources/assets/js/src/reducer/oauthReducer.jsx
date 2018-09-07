import * as constants from '../actionType'

export default function reducer(state={
    oauth : {
        access_token:null,
        expires_in:null,
        refresh_token:null,
        token_type:null,
    },
    user: null,
    isExpired: false,
    fetching: false,
    fetched: false,
    error: null
}, action ) {
    switch( action.type ){
        case constants.FETCH_OAUTH_FETCHING: {
            return { ...state,  fetching: true, fetched: false }
        }
        case constants.FETCH_OAUTH_REJECTED: {
            return { ...state, fetching: false, error: action.payload }
        }
        case constants.FETCH_OAUTH_FETCHED : {
            return { ...state, fetching: false, fetched:true,  oauth: action.payload, user: action.user }
        }
        case constants.FETCH_OAUTH_USER: {
            return { ...state, fetching: false, fetched:true,  user : action.payload}
        }
        case constants.FETCH_OAUTH_LOGOUT : {
            let oauth = {
                access_token:null,
                expires_in:null,
                refresh_token:null,
                token_type:null,
            }
            return { ...state, fetching: false, fetched:false,  oauth : oauth }
        }
        case constants.FETCH_OAUTH_EXPIRED : {
            return { ...state,  isExpired : action.payload }
        }
        default :
            return state;
    }

}