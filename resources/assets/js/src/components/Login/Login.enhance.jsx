import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { fetchOauthToken } from '../../actions/userActions'
import { Authentication } from '../../utils/services'
export default compose(
    connect(store => {
        return { users: store.users, oauth: store.oauth }
    }),
    withState('state', 'setState', {}),
    withHandlers({
        login : props => event => {
            event.preventDefault()
            props.dispatch(fetchOauthToken({username:'orange007',password:'orange007'}))
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
            if( nextProps.oauth.oauth.access_token !== null ){
                this.props.history.push('/dashboard')
            }

        }
    }),
    pure
)