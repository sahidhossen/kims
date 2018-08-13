import * as constants from '../actionType'
import axios from 'axios'

export const getKitTypes = () => dispatch => {
    dispatch({
        type: constants.FETCHING_KIT_TYPE
    })
    axios.get('/api/item_types')
        .then(function (response) {
            dispatch({ type: constants.FETCH_KIT_TYPE, payload:response.data.data });
        })
        .catch(function (error) {
            console.log("kit controller error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const addKitType = data => (dispatch, getState) => {
    dispatch({
        type: constants.FETCHING_KIT_TYPE
    })
    axios.post('/api/add_item_type', data)
        .then(function (response) {
            if( response.data.success === true ) {
                let store = getState()
                let {kitTypes: {kitTypes} } = store
                kitTypes.push(response.data.data)
                dispatch({type: constants.FETCH_KIT_TYPE, payload: kitTypes});
            }else {
                console.log("item add error: ", response.data.message)
            }
        })
        .catch(function (error) {
            console.log("kit controller error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}
