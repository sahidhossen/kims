import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { fetchUserByCompany, addUser } from '../../actions/userActions'
import { userIsAuthenticated } from '../../utils/services'

export default compose(
    connect(store => {
        return { oauth: store.oauth, users: store.users}
    }),
    userIsAuthenticated,
    withState('state', 'setState', {error:'',name:'', success:'', secret_id:'',password:'',designation:'',professional:'',mobile:''}),
    withHandlers({
        addNewSolder: props => event => {
            event.preventDefault()
            let { state:{name,secret_id, password,designation,professional,mobile }} = props 
            let {company_id,central_id,formation_id,unit_id} = props.oauth.user
            const user = {
                    name,
                    secret_id,
                    password,
                    designation,
                    professional,
                    mobile ,
                    company_id,
                    central_office_id: central_id,
                    district_office_id: formation_id,
                    unit_id,
                    role:'solder'};
            // console.log("add solder: ", user)
            props.dispatch(addUser(user))
        },
        onFieldChange: props => event => {
            let { state:{name,secret_id, password,designation,professional,mobile }, setState } = props 
            let value = event.target.value 
            let Inputname = event.target.name;

            if(Inputname === 'name')
                name = value
            if(Inputname === 'secret_id')
                secret_id = value 
            if( Inputname === 'password' )
                password = value
            if( Inputname === 'designation' )
                designation = value
            if( Inputname === 'professional' )
                professional = value
            if( Inputname === 'mobile' )
                mobile = value
            
            setState({...props.state,name, secret_id, password,designation,professional,mobile })
        }
    }),
    lifecycle({
        componentDidMount(){
            let{ users } = this.props 
            if( users.fetched === false && users.users.length === 0 ){
                this.props.dispatch(fetchUserByCompany());
            }
        },
        componentWillReceiveProps(nextProps){
            let { users } = nextProps
            if( !_.isEqual(users.users, this.props.users.users )){
               let { state, setState } = this.props 
               setState({...state, name:'', secret_id:'',password:'',designation:'',professional:'',mobile:'', error:''})
            }
            if( users.error !== null && !_.isEqual(users, this.props.users )){
                let { state, setState } = this.props
                setState({ ...state, error: users.error, success:'' })
            }

            if( users.error === null && users.fetchedAddUser === true && !_.isEqual(users, this.props.users )){
                let { state, setState } = this.props
                setState({ ...state, error: '', success:'User add successful!' })
            }

        }
    }),
    pure
)