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
    withState('state', 'setState', { actionType:'', isModalOn: false }),
    withHandlers({
        addKitController: props => type => {
            let {state, setState } = props
            setState({ ...state, actionType: type, isModalOn: true })
        },
        toggleModal: props => () => {
            let { state, setState } = props
            setState({ ...state, isModalOn: !state.isModalOn, actionType: '' })
        }

    }),
    lifecycle({
        componentDidMount() {
            this.props.dispatch(getKitController())
        },
        componentWillReceiveProps(nextProps){
            console.log("next: ", nextProps)
        }

    }),
    pure
)