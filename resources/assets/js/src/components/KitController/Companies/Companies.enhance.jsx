import { compose } from 'redux'
import { pure, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'

import { userIsAuthenticated } from '../../../utils/services'

export default compose(
    connect(store => {
        return {
            oauth: store.oauth,
            users: store.users
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {}),
    lifecycle({
        componentDidMount() {

        },
        componentWillReceiveProps(nextProps){
        }

    }),
    pure
)