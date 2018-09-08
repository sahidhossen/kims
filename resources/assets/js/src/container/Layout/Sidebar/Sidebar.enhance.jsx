import { compose } from 'redux'
import { pure, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'
import { retriveAuthUser } from '../../../actions/userActions'
export default compose(
    connect(store => {
        return { oauth: store.oauth }
    }),
    withState('state', 'setState', {}),
    lifecycle({
        componentDidMount() {
            let { oauth:{user} } = this.props 
            if(user === null ){
                this.props.dispatch(retriveAuthUser())
            } 
        }
    }),
    pure
)