import { compose } from 'redux'
import { connect } from 'react-redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { addUser } from '../../../actions/userActions'

export default compose(
    connect(store => {
        return {
            roles: store.roles,
            users: store.users,
            kitControllers: store.kitControllers
        }
    }),
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
            filterDistrictOffices:[],
            filterUnit:[],
            filterCompany:[],
            error: ''
    }),
    withHandlers({
        hideModal: props => () => {
            props.closeModal()
        },
        onChangeAction: props => event => {
            let { state: {user, filterDistrictOffices, filterUnit, filterCompany}, setState, kitControllers  } = props

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
            if(name==='user_role')
                user.role = value
            if(name === 'central_office_id') {
                user.central_office_id = value
                filterDistrictOffices = kitControllers.formation_offices.filter( office => office.central_office_id === parseInt(value) )
            }
            if(name==='formation_office_id') {
                user.district_office_id = value
                filterUnit = kitControllers.units.filter( office => office.district_office_id === parseInt(value) )
            }
            if(name==='unit_id') {
                user.unit_id = value
                filterCompany = kitControllers.companies.filter( office => office.unit_id === parseInt(value) )
            }
            if(name==='company_id') {
                user.company_id = value
            }

            setState({ ...props.state, user, filterDistrictOffices, filterUnit, filterCompany, error: '' })
        },
        addUser: props => event => {
            event.preventDefault();
            let { state, setState } = props

            state.error = state.user.role === '' ? "User must be need a role!" : "";

            if(state.error === '' ) {
                state.error = state.user.name === '' ||
                state.user.position === '' ||
                state.user.designation === '' ||
                state.user.mobile === '' ||
                state.user.secret_id === ''
                    ? "Please fill required field!" : "";
            }

            if( state.error === '' && state.user.role === 'central' ){
                state.error = state.user.central_office_id === 0 ? "Must be select central office!" : "";
            }
            if( state.error === '' && state.user.role === 'formation' ){
                state.error = state.user.central_office_id === 0 || state.user.district_office_id === 0 ? "Must be select formation & central office!" : "";
            }
            if( state.error === '' && state.user.role === 'unit' ){
                state.error =   state.user.central_office_id === 0 ||
                                state.user.district_office_id === 0 ||
                                state.user.unit_id === 0 ? "Must be required field at least unit office!" : "";
            }
            if( state.error === '' && state.user.role === 'company' ){
                state.error =   state.user.central_office_id === 0 ||
                                state.user.district_office_id === 0 ||
                                state.user.unit_id === 0 ||
                                state.user.company_id === 0 ? "Must be select required field!" : "";
            }

            if( state.error === '' && state.user.role === 'solder' ){
                state.error =   state.user.central_office_id === 0 ||
                state.user.district_office_id === 0 ||
                state.user.unit_id === 0 ||
                state.user.company_id === 0 ? "Must be select required field!" : "";
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
            let { user, actionType } = this.props
            if( actionType === true )
                this.props.setState({...this.props.state, user: user })
        },
        componentWillReceiveProps(nextProps){
            let { users } = nextProps
            if( users.error !== null && !_.isEqual(users, this.props.users)){
                let { state, setState } = this.props
                setState({ ...state, error: users.error })
            }
            if(users.error === null && !_.isEqual(users, this.props.users)){
                this.props.closeModal()
            }
        }
    }),
    pure
)