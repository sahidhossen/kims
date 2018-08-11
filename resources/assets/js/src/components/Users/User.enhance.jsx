import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../utils/services'

const allUser = [ 
    {
        name:'karim',
        secret_id:'karim211',
        password:'karim',
        role:1
    },
    {
        name:'selim',
        secret_id:'selim222',
        password:'selim22',
        role:0
    },
    {
        name:'Jahir',
        secret_id:'jahir23',
        password:'jahir222',
        role:2
    },

]
export default compose(
    connect(store => {
        return { oauth: store.oauth, all_user: allUser }
    }),
    userIsAuthenticated,
    withState('state', 'setState', { actionType: false, isModalOn: false, user: null }),
    withHandlers({
        toggleModal: props => event => {
            let { state, setState } = props
            setState({ ...state, isModalOn: !state.isModalOn, actionType: false })
        },
        userEditAction: props => (event, index) => {
            let { state, setState, all_user } = props
            setState({ ...state, user: all_user[index], isModalOn: true, actionType: true  })
        }
    }),
    lifecycle({
        componentDidMount() {

        }
    }),
    pure
)