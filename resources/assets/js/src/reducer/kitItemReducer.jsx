import * as constants from '../actionType'

const kitItems = function reducer(
    state = {
        kitItems: [],
        userKitItems:[],
        fetching: false,
        fetched: false,
        error: null
    },
    action
) {
    switch (action.type) {
        case constants.FETCHING_KIT_ITEM: {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            }
        }
        case constants.REJECT_KIT_ITEM: {
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        }
        case constants.FETCH_KIT_ITEM: {
            return {
                ...state,
                fetching: true,
                error: null,
                fetched: true,
                kitItems: action.payload,
            }
        }
        case constants.FETCH_KIT_ITEM_FOR_USER: {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error:null,
                userKitItems: action.payload
            }
        }
    }
    return state
}
export default kitItems