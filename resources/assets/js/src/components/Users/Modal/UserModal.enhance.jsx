import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
export default compose(
    withState('state', 'setState', { user: {name:'', secret_id: '', password:'', role:0 } }),
    withHandlers({
        hideModal: props => () => {
            props.closeModal()
        },
        onChangeAction: props => event => {
            let { state: {user}, setState } = props 

            let name = event.target.name
            let value = event.target.value

            if( name === 'u_name')
                user.name = value 
            if( name === 'secret_id')
                user.secret_id = value 
            if( name === 'password')
                user.password = value 
            if(name==='role')
                user.role = value
            setState({ ...props.state, user: user })
        },
        addUser: props => event => {
            event.preventDefault();
            console.log(props.state.user)
        }
    }),
    lifecycle({
        componentDidMount() {
            let { user, actionType } = this.props 
            if( actionType === true )
                this.props.setState({...this.props.state, user: user })
        }
    }),
    pure
)