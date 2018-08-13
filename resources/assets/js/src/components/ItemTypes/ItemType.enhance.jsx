import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../utils/services'
import { getKitTypes, addKitType } from '../../actions/kitTypeActions'

export default compose(
    connect(store => {
        return { kitTypes: store.kitTypes }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {
        kitType: { type_name: '', details:'', id:0 },
        error: '',
        isUpdate: false
    }),
    withHandlers({
        onChangeAction: props => event => {
            let { state, setState } = props
            let {kitType} = state
            let name = event.target.name;
            let value = event.target.value;
            if( name === 'type_name' ){
                kitType.type_name = value
            }
            if( name === 'details' ){
                kitType.details = value
            }
            setState({ ...state, kitType })
        },
        addKitType: props => event => {
            event.preventDefault();
            let { state, setState } = props
            let { kitType, error } = state
            error = kitType.kit_name === '' ? 'Kit Type required field!' : ''
            if(error === '') {
                props.dispatch(addKitType(kitType))
            }else {
                setState({...state, error })
            }
        },
        kitTypeEditAction: props => (e, index) => {
            let { kitTypes, state, setState } = props
            console.log("index: ", index)
            setState({...state, kitType: kitTypes.kitTypes[index], isUpdate: true })
            window.scrollTo(0,0)
        }
    }),
    lifecycle({
        componentDidMount() {
            if( this.props.kitTypes.kitTypes.length === 0)
                this.props.dispatch(getKitTypes())
        },
        componentWillReceiveProps(nextProps){
            // console.log("kit types: ", nextProps)
        }

    }),
    pure
)