import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { UserLogin } from '../../actions/userActions'

export default compose(
    connect(store => {
        return { users: store.users }
    }),
    withState('state', 'setState', {}),
    withHandlers({
        login : props => event => {
            event.preventDefault()
            props.dispatch(UserLogin())
        }
    }),
    lifecycle({
        componentDidMount(){
          // console.log("props: ", this.props)
        },
        componentWillReceiveProps(nextProps) {
            if( nextProps.users.isLoggedIn )
                this.props.history.push('/dashboard')
        }
    }),
    pure
)