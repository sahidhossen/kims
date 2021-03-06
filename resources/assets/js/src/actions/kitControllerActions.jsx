import * as constants from '../actionType'
import axios from 'axios'


export const getKitController = () => dispatch => {

    dispatch({
        type: constants.FETCHING_KIT_CONTROLLER
    })
    axios.get('/api/get_kit_controllers')
        .then(function (response) {
            if(response.data.success === true ) {
                dispatch({type: constants.FETCH_KIT_CONTROLLER, payload: response.data.data});
            }
        })
        .catch(function (error) {
            console.log("kit controller error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const saveKitController = (state, actionType ) => (dispatch, getState) => {

    // dispatch({
    //     type: constants.FETCHING_KIT_CONTROLLER
    // })

    let endPoint = ''
    let data  = {}
    if( actionType === 'central' ) {
        endPoint = 'add_central_office'
        data = state.central_office
    }
    if( actionType === 'district') {
        endPoint = 'add_district_office'
        data = state.formation_office
    }
    if( actionType === 'quarter_master') {
        endPoint = 'add_quarter_master_office'
        data = state.quarter_master
    }
    if( actionType === 'unit') {
        endPoint = 'add_unit'
        data = state.unit
    }

    if( actionType === 'company') {
        endPoint = 'add_company'
        data = state.company
    }
    axios.post('/api/'+endPoint, data )
        .then(function (response) {

            if( response.success === false )
                return false
            let store = getState()
            let result = response.data.data
            let kitControllers = store.kitControllers

            if( actionType === 'central' ) {
                kitControllers.central_offices.push(result)
            }
            if( actionType === 'district' ) {
                kitControllers.formation_offices.push(result)
            }
            if( actionType === 'quarter_master' ) {
                kitControllers.quarters.push(result)
            }
            if( actionType === 'unit' ) {
                kitControllers.units.push(result)
            }
            if( actionType === 'company' ) {
                kitControllers.companies.push(result)
            }

            dispatch({ type: constants.FETCH_KIT_CONTROLLER, payload: kitControllers });
        })
        .catch(function (error) {
            console.log("kit controller error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}

export const deleteKitController = (type, data, index) => (dispatch, getState) => {
    let url = ''
    if(type === 'company') {
        url = '/api/delete_company_office'
    }
    if(type === 'unit') {
        url = '/api/delete_unit_office'
    }
    if(type === 'quarter_master') {
        url = '/api/delete_quarter_master_office'
    }
    if(type === 'formation') {
        url = '/api/delete_district_office'
    }
    if(type === 'central') {
        url = '/api/delete_central_office'
    }


    let store = getState()
    let kitControllers = store.kitControllers

    axios.post(url, data)
        .then(function (response) {
            if(type === 'company'){
                kitControllers.companies.splice(index,1)
            }
            if(type === 'unit'){
                kitControllers.units.splice(index,1)
            }
            if(type === 'quarter_master'){
                kitControllers.quarters.splice(index,1)
            }
            if(type === 'formation'){
                kitControllers.formation_offices.splice(index,1)
            }
            if(type === 'central'){
                kitControllers.central_offices.splice(index,1)
            }

            dispatch({ type: constants.FETCH_KIT_CONTROLLER, payload:kitControllers });
        })
        .catch(function (error) {
            console.log("kit controller error: ",error);
            // dispatch({ type: constants.FETCH_OAUTH_REJECTED, payload: error })
        });
}