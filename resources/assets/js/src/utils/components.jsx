import PropTypes from 'prop-types'
import { compose, withContext, getContext } from 'recompose'
/**
 * HOC that adds store to props
 * @return {HigherOrderComponent}
 */
export const withStore = compose(
    withContext({ store: PropTypes.object }, () => {}),
    getContext({ store: PropTypes.object })
)

/**
 * HOC that adds router to props
 * @return {HigherOrderComponent}
 */
export const withRouter = compose(
    withContext({ route: PropTypes.object }, () => {}),
    getContext({ route: PropTypes.object })
)