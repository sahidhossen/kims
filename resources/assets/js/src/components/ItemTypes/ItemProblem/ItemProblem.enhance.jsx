import { compose } from 'redux'
import { pure, lifecycle, withState,  withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../../utils/services'
import { addKitTypeProblem } from '../../../actions/kitTypeActions'

export default compose(
    connect(store => {
        return {
            kitItems: store.kitItems
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {problem_list: [], error: '', problem:'' }),
    withHandlers({
        saveKitProblem: props => event => {
            event.preventDefault()
            let { state, kit_type, type_index, onClose } = props
            let { problem_list } = state
            kit_type.problems = problem_list
            kit_type.index = type_index
            props.dispatch(addKitTypeProblem(kit_type))
            onClose()
        },
        onUpdateKitType: props => event => {
            let {state, setState } = props
            let newProblem = event.target.value
            setState({ ...state, problem: newProblem })
        },
        addKitProblem: props => event => {
            event.preventDefault()
            let { state, setState} = props
            let { problem_list, error, problem  } = state
            if(problem.length < 4 )
                error = "Minimum problem length 4"
            problem_list.unshift(problem)
            setState({...state, problem_list, error })
        },
        removeProblemAction: props => index => {
            let { state, setState } = props
            let { problem_list } = state
            problem_list.splice(index,1)
            setState({...state, problem_list })
        },
        onCloseModal: props => event => {
            let { onClose } = props
            onClose()
        }
    }),

    lifecycle({
        componentDidMount() {
            let { state, setState, kit_type  } = this.props
            let problem_list = kit_type.problems === null ? [] : kit_type.problems
            setState({...state, problem_list: problem_list })
        },
        componentWillReceiveProps(nextProps){

        }

    }),
    pure
)