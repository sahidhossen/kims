import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'

export default compose(
    connect(store => {
        return { kitControllers: store.kitControllers }
    }),
    withState('state', 'setState', {
        offices:[],
        title: '',
        fetched: false,
        currentOffice: null,
        history: [],
    }),
    withHandlers({
        hideModal: props => () => {
            props.closeModal()
        },
        goBack: props => index => {
            let { state, setState, kitControllers } = props
            let { history } = state
            let currentHistory = history[index-1]
            let {office_type, search_office, office } = currentHistory
            let subOffices = []
            if( office_type === 'units') {
                subOffices = kitControllers[search_office].filter(of => of.unit_id === office.id)
            }
            if( office_type === 'quarters') {
                subOffices = kitControllers[search_office].filter(of => of.quarter_master_id === office.id)
            }
            if( office_type === 'formation_offices') {
                subOffices = kitControllers[search_office].filter(of => of.formation_office_id === office.id)
            }
            if( office_type === 'central_offices') {
                subOffices = kitControllers[search_office].filter(of => of.central_office_id === office.id)
            }
            let subOffice = {office_type, search_office, office}
            history.splice(index, 1);
            setState({ ...state, offices:subOffices, fetched: true, currentOffice: subOffice, history })

        },

        goForward: props => (office_type, search_office, office ) => {
            let { state, setState, kitControllers } = props
            let { history } = state
            let subOffices = []
            if( office_type === 'units') {
                subOffices = kitControllers[search_office].filter(of => of.unit_id === office.id)
            }
            if( office_type === 'quarters') {
                subOffices = kitControllers[search_office].filter(of => of.quarter_master_id === office.id)
            }
            if( office_type === 'formation_offices') {
                subOffices = kitControllers[search_office].filter(of => of.formation_office_id === office.id)
            }
            if( office_type === 'central_offices') {
                subOffices = kitControllers[search_office].filter(of => of.central_office_id === office.id)
            }
            let subOffice = {office_type, search_office, office}
            history.push(subOffice)
            setState({ ...state, offices:subOffices, fetched: true, currentOffice: subOffice, history })
        }
    }),
    lifecycle({
        componentDidMount() {
            let {
                subOffice,
                kitControllers,
                state,
                setState } = this.props
            let { office_type, search_office, office } = subOffice
            let { history } = state
            history = []
            history.push(subOffice)
            let subOffices = []
            if( office_type === 'units') {
                subOffices = kitControllers[search_office].filter(of => of.unit_id === office.id)
            }
            if( office_type === 'quarters') {
                subOffices = kitControllers[search_office].filter(of => of.quarter_master_id === office.id)
            }
            if( office_type === 'formation_offices') {
                subOffices = kitControllers[search_office].filter(of => of.formation_office_id === office.id)
            }
            if( office_type === 'central_offices') {
                subOffices = kitControllers[search_office].filter(of => of.central_office_id === office.id)
            }
            setState({ ...state, offices:subOffices, fetched: true, currentOffice: subOffice, history })

        },
        componentWillReceiveProps(nextProps){
            // console.log("state: ",nextProps.state)
        }

    }),
    pure
)