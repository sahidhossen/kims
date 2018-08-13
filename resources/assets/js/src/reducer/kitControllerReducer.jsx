import * as constants from '../actionType'

const kitControllers = function reducer(
    state = {
        central_offices: [],
        formation_offices: [],
        units: [],
        companies: [],
        fetching: false,
        fetched: false,
        error: null
    },
    action
) {
    switch (action.type) {
        case constants.FETCHING_KIT_CONTROLLER: {
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
        }
        case constants.FETCH_KIT_CONTROLLER: {
            let { central_offices, formation_offices, units, companies } = action.payload
            return {
                ...state,
                fetching: true,
                error: null,
                fetched: true,
                central_offices: central_offices,
                formation_offices: formation_offices,
                units: units,
                companies: companies,

            }
        }
    }
    return state
}
export default kitControllers