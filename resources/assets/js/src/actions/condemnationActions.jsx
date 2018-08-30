import * as constants from '../actionType'
import axios from 'axios'

export const getCondemnations = () => dispatch => {
    dispatch({
        type: constants.FETCHING_CONDEMNATION
    })
    axios.get('/api/get_condemnations')
        .then(function (response) {

            if(response.data.success === true )
                dispatch({ type: constants.FETCH_CONDEMNATION, payload:response.data.data });
            else
                dispatch({ type: constants.REJECT_CONDEMNATION, payload:response.data.message });
        })
        .catch(function (error) {
            console.log("condemnation critical error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}


export const addCondemnation = data => (dispatch, getState) => {
    dispatch({type: constants.FETCHING_CONDEMNATION })
    axios.post('/api/add_condemnation', data)
        .then(function (response) {
            console.log("res: ", response)
            if( response.data.success === true ) {
                let store = getState()
                let {condemnations: {condemnation}} = store
                condemnation.unshift(response.data.data)
                dispatch({type: constants.FETCH_CONDEMNATION, payload: condemnation });
            }else {
                dispatch({type: constants.REJECT_CONDEMNATION, payload: response.data.message })
            }
        })
        .catch(function (error) {
            console.log("kit item error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}


export const deleteCondemnation = (index, condemnation_id) => (dispatch, getState) => {
    dispatch({type: constants.FETCHING_CONDEMNATION })
    axios.post('/api/delete_condemnation', {condemnation_id: condemnation_id })
        .then(function (response) {
            if( response.data.success === true ) {
                let store = getState()
                let {condemnations: {condemnation}} = store
                condemnation.splice(index, 1)
                dispatch({type: constants.FETCH_CONDEMNATION, payload: condemnation });
            }else {
                dispatch({type: constants.REJECT_CONDEMNATION, payload: response.data.message })
            }
        })
        .catch(function (error) {
            console.log("kit item error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}