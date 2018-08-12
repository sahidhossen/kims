import { compose } from 'redux'
import { connect } from 'react-redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { addUser } from '../../../actions/userActions'

export default compose(
    connect(store => {
        return {
            roles: store.roles,
            kitControllers: store.kitControllers
        }
    }),
    withState('state', 'setState', {
            user: {
                name:'',
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

            setState({ ...props.state, user, filterDistrictOffices, filterUnit, filterCompany})
        },
        addUser: props => event => {
            event.preventDefault();
            let { state, setState } = props

            state.error = state.user.name === '' ||
                    state.user.secret_id === '' ||
                    state.user.role === '' ||
                    state.user.central_office_id === 0 ||
                    state.user.district_office_id === 0 ||
                    state.user.unit_id === 0 ||
                    state.user.company_id === 0
                    ? "Please fill required field!" : "";

            console.log("user: ", state.user )

            if( state.error !== "" ){
                setState({ ...state, error })
            }else {
                props.dispatch(addUser(state.user))
            }
        }
    }),
    lifecycle({
        componentDidMount() {
            console.log("props: ", this.props)
            let { user, actionType } = this.props 
            if( actionType === true )
                this.props.setState({...this.props.state, user: user })
        }
    }),
    pure
)