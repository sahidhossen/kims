import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'

export default compose(
    connect(store => {
        return {}
    }),
    withState('state', 'setState', { items: null }),
    withHandlers({
        hideModal: props => () => {
            let { closeModal } = props
            closeModal()
        },
        deleteItem: props => (e, item, index)=> {
            e.preventDefault()
            let { items, state, setState } = props
            // Need to create delete action for item
        }
    }),
    lifecycle({
        componentDidMount() {
            let {items, state, setState} = this.props
            setState({...state, items: items })
        },
        componentWillReceiveProps(nextProps){

        }

    }),
    pure
)