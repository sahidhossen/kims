import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../../utils/services'
import { fetchUserById, assignItemToSolder, getAssignedItems } from '../../../actions/userActions'
import { getKitItemsByCentralId } from  '../../../actions/kitItemActions'
import { getKitTypes } from  '../../../actions/kitTypeActions'

export default compose(
    connect(store => {
        return {
            users: store.users,
            kitItems: store.kitItems,
            kitTypes: store.kitTypes
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {
        kitItemOptions:[],
        kitItemSelection:null,
        kitTypeOptions:[],
        kitTypeSelection:null,
        assignItem: {
            item_id: 0,
            item_type_id: 0,
            user_id: 0
        },
        error: ''
    }),
    withHandlers({
        filterKitType: props => kitItems => {
            if( kitItems.length > 0 ){
                let { state, setState } = props
                let { kitTypeOptions } = state
                kitTypeOptions = kitItems.map( item => ({value: item.id, label: item.type_name }))
                setState({ ...state, kitTypeOptions })
            }
        },
        filterKitItem:  props => kitItems => {
            if( kitItems.length > 0 ){
                let { state, setState } = props
                let { kitItemOptions } = state

                kitItemOptions = kitItems.map( item => ({value: item.id, label: item.kit_name }))
                setState({ ...state, kitItemOptions })
            }
        },
        onChangeAction: props => (option, name) => {
            let { state, setState, users } = props
            if( name === 'kit_type_id' ){
                setState({ ...state , kitTypeSelection: option })
                let params = { central_office_id: users.user.central_office_id, item_type_id: option.value }
                props.dispatch(getKitItemsByCentralId(params))
            }
            if(name === 'kit_item_id'){
                setState({ ...state , kitItemSelection: option })
            }
        },
        assignItem: props => event => {
            let { state, setState, users:{user} } = props
            let { kitItemSelection, kitTypeSelection, error, assignItem } = state
            error = kitItemSelection === null || kitTypeSelection === null ? "Both field required!":'';

            if( error === ''){
                console.log(kitItemSelection)
                assignItem.user_id = user.id
                assignItem.item_id = kitItemSelection.value
                assignItem.item_type_id = kitTypeSelection.value
                props.dispatch(assignItemToSolder(assignItem))
            }else {
                setState({...state, error })
            }
        }
    }),
    lifecycle({
        componentDidMount() {
            let { match: { params }, kitTypes, kitItems, filterKitType, filterKitItem } = this.props
            this.props.dispatch( fetchUserById( {user_id: params.id } ))
            this.props.dispatch( getAssignedItems({ user_id: params.id }))
            if( kitTypes.kitTypes.length === 0)
                this.props.dispatch(getKitTypes())
            else {
                filterKitType(kitTypes.kitTypes)
            }

            if(kitItems.userKitItems.length > 0 ){
                filterKitItem(kitItems.userKitItems)
            }
        },
        componentWillReceiveProps(nextProps){
            let { filterKitType, filterKitItem, kitTypes, kitItems } = nextProps
            if(!_.isEqual(this.props.kitTypes, kitTypes)){
                filterKitType(kitTypes.kitTypes)
            }
            if(!_.isEqual(this.props.kitItems.userKitItems, kitItems.userKitItems)){
                filterKitItem(kitItems.userKitItems)
            }
        }

    }),
    pure
)