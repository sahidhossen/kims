import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { getKitController } from '../../../actions/kitControllerActions'
import { userIsAuthenticated } from '../../../utils/services'
import { addUser } from '../../../actions/userActions'

export default compose(
    connect(store => {
        return { users: store.users }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {
        user: {
            name:'',
            professional:'',
            designation:'',
            mobile:'',
            secret_id: '',
            password:'',
            role:'',
            central_office_id:0,
            district_office_id:0,
            unit_id:0,
            company_id:0,
        },
        office_name:'',
        error:'',
        isModalOn: false,
    }),
    withHandlers({
        hideModal: props => () => {
            props.closeModal()
        },

        onChangeAction: props => () => event => {
            let { state: {user}, setState  } = props

            let name = event.target.name
            let value = event.target.value

            if( name === 'u_name')
                user.name = value
            if( name === 'professional')
                user.professional = value
            if( name === 'designation')
                user.designation = value
            if( name === 'mobile')
                user.mobile = value
            if( name === 'secret_id')
                user.secret_id = value
            if( name === 'password')
                user.password = value

            setState({...props.state, user: user, error: '' })
        },
        saveUser: props => () => {
            let { state, setState } = props

            if(state.error === '' ) {
                state.error = state.user.name === '' ||
                state.user.position === '' ||
                state.user.designation === '' ||
                state.user.mobile === '' ||
                state.user.secret_id === ''
                    ? "Please fill required field!" : "";
            }

            if( state.error !== "" ){
                setState({ ...state })
            }else {
                props.dispatch(addUser(state.user))
            }
        }

    }),
    lifecycle({
        componentDidMount() {
            let { office, roleType, state, setState} = this.props
            let {user, office_name} = state
            if(roleType === 'central') {
                user.role = 'central'
                user.central_office_id = office.id
                office_name = office.central_name
            }
            if(roleType === 'formation') {
                user.role = 'formation'
                user.central_office_id = office.central_office_id
                user.district_office_id = office.id
                office_name = office.district_name
            }
            if(roleType === 'quarter_master') {
                user.role = 'quarter_master'
                user.central_office_id = office.central_office_id
                user.district_office_id = office.formation_office_id
                user.quarter_master_id = office.id
                office_name = office.quarter_name
            }
            if(roleType === 'unit') {
                user.role = 'unit'
                user.central_office_id = office.central_office_id
                user.district_office_id = office.district_office_id
                user.quarter_master_id = office.quarter_master_id
                user.unit_id = office.id
                office_name = office.unit_name
            }
            if(roleType === 'company') {
                user.role = 'company'
                user.central_office_id = office.central_office_id
                user.district_office_id = office.district_office_id
                user.unit_id = office.unit_id
                user.company_id = office.id
                office_name = office.company_name
            }
            setState({...state, user: user, office_name: office_name })

        },
        componentWillReceiveProps(nextProps){
            let { users } = nextProps
            if(!_.isEqual(users, this.props.users)){
                window.location.reload()
            }
        }

    }),
    pure
)