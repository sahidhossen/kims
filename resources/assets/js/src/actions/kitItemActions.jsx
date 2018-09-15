import * as constants from '../actionType'
import axios from 'axios'

export const getKitItems = () => dispatch => {
    dispatch({
        type: constants.FETCHING_KIT_ITEM
    })
    axios.get('/api/active_kit_items')
        .then(function (response) {
            console.log("res: ", response.data);
            dispatch({ type: constants.FETCH_KIT_ITEM, payload:response.data.data });
        })
        .catch(function (error) {
            console.log("kit item error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const addKitItem = data => (dispatch, getState) => {
    dispatch({type: constants.FETCHING_KIT_ITEM })
    axios.post('/api/add_kit_item', data)
        .then(function (response) {

            if( response.data.success === true ) {
                let store = getState()
                let {kitItems: {kitItems}} = store
                kitItems.unshift(response.data.data)
                dispatch({type: constants.FETCH_KIT_ITEM, payload: kitItems });
            }else {
                console.log("rejected: ", response.data.message );
                dispatch({type: constants.REJECT_KIT_ITEM, payload: response.data.message })
            }
        })
        .catch(function (error) {
            console.log("kit item error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const getKitItemsByCentralId = data => dispatch => {
    axios.get('/api/kit_items_by_central_office', { params: data } )
        .then(function (response) {
            if( response.data.success === true ) {
                dispatch({type: constants.FETCH_KIT_ITEM_FOR_USER, payload: response.data.data });
            }else {
                console.log("error: ", response.data.message )
                dispatch({type: constants.REJECT_KIT_ITEM, payload: response.data.message });
            }
        })
        .catch(function (error) {
            console.log("role error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

