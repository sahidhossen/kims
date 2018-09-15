import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { getKitController } from '../../actions/kitControllerActions'
import { userIsAuthenticated } from '../../utils/services'

export default compose(
    connect(store => {
        return { kitControllers: store.kitControllers }
    }),
    userIsAuthenticated,
    withState('state', 'setState', { }),
    withHandlers({

    }),
    lifecycle({
        componentDidMount() {
            let { location: {state:{office}}, state, setState} = this.props
            setState({...state, office: office })

        },
        componentWillReceiveProps(nextProps){
            console.log("details: ", nextProps)
        }

    }),
    pure
)