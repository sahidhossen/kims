import { compose } from 'redux'
import { pure, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../utils/services'
import { fetchUserByCompany } from '../../actions/userActions'

export default compose(
    connect(store => {
        return { oauth: store.oauth, users: store.users }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {}),
    lifecycle({
        componentDidMount() {
            let { users, oauth } = this.props
            if( users.users.length === 0 && oauth.user !== null ) {
                if (users.fetched === false && users.users.length === 0 && oauth.user.whoami === 'company') {
                    this.props.dispatch(fetchUserByCompany());
                }
            }
        },
        componentWillReceiveProps(nextProps){
            let { users, oauth } = nextProps
            if( users.users.length === 0 && oauth.user !== null ){
                if( users.fetched === false && users.users.length === 0 &&  oauth.user.whoami === 'company'){
                    this.props.dispatch(fetchUserByCompany());
                }
            }
        }

    }),
    pure
)