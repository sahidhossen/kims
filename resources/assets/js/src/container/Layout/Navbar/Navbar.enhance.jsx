import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { logout } from '../../../actions/userActions'

export default compose(
    connect(store => {
        return { oauth: store.oauth }
    }),
    withState('state', 'setState', {}),
    withHandlers({
        logout: props => event => {
            event.preventDefault()
            props.dispatch(logout())
        }
    }),
    pure
)