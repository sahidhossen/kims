import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../utils/services'
import * as constants from '../../actionType'
import {getPendingRequest, approveUnitRequest, completeCentralTask} from '../../actions/pendingRequestActions'

export default compose(
    connect(store => {
        return {
            oauth: store.oauth,
            pendingRequest: store.pendingRequest
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {}),
    withHandlers({
        approveUnitRequest : props => (request_id, items ) => {
            let data = {request_id: request_id, approval_items: items }
            props.dispatch(approveUnitRequest(data))
        },
        taskComplete: props => (request_id, index) => {
            let data = { request_id, index }
            props.dispatch(completeCentralTask(data))
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.dispatch(getPendingRequest())
        },
        componentWillReceiveProps(nextProps){
            let { pendingRequest, dispatch } = nextProps
            if(pendingRequest.task_message !== '' ){
                setTimeout(()=> {
                    dispatch({ type: constants.REMOVE_TASK_COMPLETE })
                }, 2500 )

            }
        }

    }),
    pure
)