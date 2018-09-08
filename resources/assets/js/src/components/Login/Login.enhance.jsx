import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { fetchOauthToken, fetchAuthUser } from '../../actions/userActions'
import { Authentication } from '../../utils/services'
export default compose(
    connect(store => {
        return { users: store.users, oauth: store.oauth }
    }),
    withState('state', 'setState', { secret_id:'',password:'', error: ''}),
    withHandlers({
        login : props => event => {
            event.preventDefault()
            let { state, setState } = props
            let {secret_id, password } = state
            props.dispatch(fetchOauthToken({username:secret_id,password:password}))
            setState({...state, error: ''})
        },
        onFieldChange: props => event => {
            let { state:{secret_id, password }, setState } = props 
            let value = event.target.value 
            let name = event.target.name;
            if(name === 'secret_id')
                secret_id = value 
            if( name === 'password' )
                password = value
            setState({...props.state, secret_id, password })
        }
    }),
    lifecycle({
        componentDidMount(){
          if( this.props.oauth.fetched === false ) {
              if (Authentication(this.props) !== null) {
                  this.props.history.push('/dashboard')
              }
          }else{
              this.props.history.push('/dashboard')
          }
        },
        componentWillReceiveProps(nextProps) {
            if( nextProps.oauth.oauth.access_token !== null && nextProps.oauth.oauth.user !== null ){
                this.props.history.push('/dashboard')
            }

        }
    }),
    pure
)