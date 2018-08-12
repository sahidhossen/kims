import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../utils/services'
import { getUserRole, fetchUser } from '../../actions/userActions'
import { getKitController } from '../../actions/kitControllerActions'


export default compose(
    connect(store => {
        return {
            oauth: store.oauth,
            users: store.users,
            roles: store.roles,
            kitControllers: store.kitControllers
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', { actionType: false, isModalOn: false, user: null  }),
    withHandlers({
        toggleModal: props => event => {
            let { state, setState } = props
            setState({ ...state, isModalOn: !state.isModalOn, actionType: false })
        },
        userEditAction: props => (event, index) => {
            let { state, setState } = props
            setState({ ...state, user: state.all_user[index], isModalOn: true, actionType: true  })
        },
        userDeleteAction: props => (event, index) => {
            let { state, setState } = props
            state.all_user.splice(index, 1); 
            setState({ ...state, all_user: state.all_user })
        }
    }),
    lifecycle({
        componentDidMount() {
            let { roles: { roles },  users:{users} } = this.props
            if(roles.length === 0 )
                this.props.dispatch(getUserRole())

            if( users.length  === 0)
                this.props.dispatch(fetchUser())

            this.props.dispatch(getKitController())
        },
        componentWillReceiveProps(nextProps){

        }
    }),
    pure
)