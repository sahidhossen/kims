import { compose } from 'redux'
import { pure, lifecycle, withState } from 'recompose'

export default compose(
    // connect(store => {
    //     return { blogs: store.blogstore }
    // }),
    withState('state', 'setState', {}),
    lifecycle({
        componentDidMount() {

        }
    }),
    pure
)