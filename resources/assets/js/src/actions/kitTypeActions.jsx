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
    let formData = new FormData();
    if(data.image_file !== null ) {
        formData.append('file', data.image_file);
    }

    formData.append('type_name', data.type_name)
    formData.append('details', data.details)
    if(data.id !== 0)
        formData.append('id', data.id)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }

    let apiUrl = data.id === 0 ? '/api/add_item_type' : '/api/update_item_type'

    axios.post(apiUrl, formData, config)
        .then(function (response) {
            if( response.data.success === true ) {
                let store = getState()
                let {kitTypes: {kitTypes} } = store
                if(data.index !== null )
                    kitTypes[data.index] = response.data.data
                else
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

/*
 Data contains (problem_list=array, index=integer, item_type_id=integer)
 */
export const addKitTypeProblem = data => (dispatch, getState) => {
    dispatch({
        type: constants.FETCHING_KIT_TYPE_PROBLEM
    })

    // return
    axios.post('/api/update_item_type', data)
        .then(function (response) {
            if( response.data.success === true ) {
                let store = getState()
                let {kitTypes: {kitTypes} } = store
                kitTypes[data.index] = response.data.data
                dispatch({type: constants.FETCH_KIT_TYPE, payload: kitTypes});
            }else {
                console.log("problem add error: ", response.data.message)

            }
        })
        .catch(function (error) {
            console.log("kit controller error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}