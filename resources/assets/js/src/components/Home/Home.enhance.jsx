import { compose } from 'redux'
import { pure, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../utils/services'
import { fetchUserByCompany } from '../../actions/userActions'
import { getKitController } from '../../actions/kitControllerActions'

export default compose(
    connect(store => {
        return {
            oauth: store.oauth,
            users: store.users,
            kitControllers: store.kitControllers
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {}),
    lifecycle({
        componentDidMount() {
            let { users, oauth , kitControllers} = this.props
            if( users.users.length === 0 && oauth.user !== null ) {
                if (users.fetched === false && users.users.length === 0 && oauth.user.whoami === 'company') {
                    this.props.dispatch(fetchUserByCompany());
                }
            }

            if(oauth.user !== null && kitControllers.central_offices.length === 0 && oauth.user.whoami === 'central'){
                this.props.dispatch(getKitController())
            }
        },
        componentWillReceiveProps(nextProps){
            let { users, oauth, kitControllers } = nextProps
            if( users.users.length === 0 && oauth.user !== null ){
                if( users.fetched === false && users.users.length === 0 &&  oauth.user.whoami === 'company'){
                    this.props.dispatch(fetchUserByCompany());
                }
            }
            if(oauth.user !== null) {
                if ( kitControllers.fetched === false && kitControllers.fetching === false && kitControllers.central_offices.length === 0 && oauth.user.whoami === 'central') {
                    this.props.dispatch(getKitController());
                }
            }


        }

    }),
    pure
)