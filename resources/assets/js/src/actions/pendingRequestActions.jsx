import * as constants from '../actionType'
import axios from 'axios'

export const getPendingRequest = () => dispatch => {
    dispatch({
        type: constants.FETCHING_PENDING_REQUEST
    })
    axios.get('/api/get_central_level_request')
        .then(function (response) {
            console.log("central response: ", response.data )
            if(response.data.success === true )
                dispatch({ type: constants.FETCH_PENDING_REQUEST, payload:response.data.data });
            else
                dispatch({ type: constants.REJECT_PENDING_REQUEST, payload:response.data.message });
        })
        .catch(function (error) {
            console.log("condemnation critical error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const approveUnitRequest = data => dispatch => {
    // dispatch({type: constants.FETCHING_PENDING_REQUEST})
    axios.post('/api/unit_request_confirm_from_central', data)
        .then(function (response) {
            // console.log("s", response)
            if(response.data.success === true )
                dispatch({ type: constants.FETCH_PENDING_REQUEST, payload:response.data.data });
            else
                dispatch({ type: constants.REJECT_PENDING_REQUEST, payload:response.data.message });
        })
        .catch(function (error) {
            console.log("condemnation critical error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const completeCentralTask = data => (dispatch, getState) => {
    axios.post('/api/complete_central_pending_task', data)
        .then(function (response) {

            if(response.data.success === true ) {
                let data = response.data
                if( data.task_complete === true ) {
                    let store = getState()
                    let {pendingRequest: {pendingRequest}} = store
                    pendingRequest.splice(data.index, 1)
                    dispatch({type: constants.FETCH_PENDING_REQUEST, payload: pendingRequest});
                }else {
                    dispatch({type: constants.FETCH_TASK_COMPLETE, payload: "Has more task"});
                }
            }
            else
                dispatch({ type: constants.REJECT_PENDING_REQUEST, payload:response.data.message });
        })
        .catch(function (error) {
            console.log("condemnation critical error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}