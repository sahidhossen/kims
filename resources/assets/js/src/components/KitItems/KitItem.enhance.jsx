import { compose } from 'redux'
import { pure, lifecycle, withState, withStateHandlers, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { userIsAuthenticated } from '../../utils/services'
import { getKitItems, addKitItem } from  '../../actions/kitItemActions'
import { getKitTypes } from  '../../actions/kitTypeActions'
import { getKitController } from '../../actions/kitControllerActions'
export default compose(
    connect(store => {
        return {
            kitItems: store.kitItems,
            kitTypes: store.kitTypes,
            kitControllers: store.kitControllers
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {
        itemKitTypeOptions:[],
        centralOfficeOptions:[],
        error: '',
        kitSelectOption:{ value:0, label: 'select type'},
        centralOfficeSelectedOption:{},
        kitItem:{
            central_office_id: 0,
            item_type_id: 0
        },
        items: null,
        isModalOn: false
    }),
    withHandlers({
        filterCentralOffice: props => centralOffice => {
            if( centralOffice.length > 0 ){
                let { state, setState } = props;
                let { kitItem, centralOfficeOptions, centralOfficeSelectedOption} = state
                centralOfficeOptions = centralOffice.map( office => ({value: office.id, label: office.central_name }))
                if( centralOfficeOptions.length > 0 ) {
                    centralOfficeSelectedOption = centralOfficeOptions[0]
                    kitItem.central_office_id = centralOfficeOptions[0].value
                }

                setState({ ...state, kitItem, centralOfficeOptions, centralOfficeSelectedOption })
            }
        },
        filterItemKitType: props => kitItems => {
            if( kitItems.length > 0 ){
                let { state, setState } = props
                state.itemKitTypeOptions = kitItems.map( item => ({value: item.id, label: item.type_name }))
                setState({ ...state })
            }
        },
        addItem: props => event => {
            let { state, setState } = props
            let { kitItem, error } = state
            error = kitItem.central_office_id === 0 || kitItem.item_type_id === 0 ? 'Both field are required!' : ''
            if( error !== '' )
                setState({...state, error })
            else {
                setState({...state, error: ''})
                props.dispatch(addKitItem(kitItem))
            }

        },
        onChangeAction: props => (option, name) => {
            let { state, setState } = props
            let { kitItem, kitSelectOption, centralOfficeSelectedOption } = state

           if( name === 'kit_type_id'){
                kitItem.item_type_id = option.value
               kitSelectOption = option
           }
           if( name === 'central_office_id'){
               kitItem.central_office_id = option.value
               centralOfficeSelectedOption = option
           }

           setState({ ...state , kitItem , kitSelectOption, centralOfficeSelectedOption})
        },
        toggleModal: props => (e, items) => {
            e.preventDefault()
            let { state, setState } = props
            setState({...state, items: items, isModalOn: !state.isModalOn })
        },
        closeModal: props => () => {
            let { state, setState } = props
            setState({...state, isModalOn: false, items: null })
        }
    }),

    lifecycle({
        componentDidMount() {
            let { kitTypes, kitItems, kitControllers, filterCentralOffice, filterItemKitType } = this.props
            if( kitTypes.kitTypes.length === 0) {
                this.props.dispatch(getKitTypes())
            }else {
                filterItemKitType(kitTypes.kitTypes)
            }

            if(kitItems.kitItems.length === 0) {
                this.props.dispatch(getKitItems())
            }

            if(kitControllers.central_offices.length === 0 )
                this.props.dispatch(getKitController())
            else
                filterCentralOffice(kitControllers.central_offices)
        },
        componentWillReceiveProps(nextProps){
            let { kitControllers, filterCentralOffice, kitTypes, filterItemKitType } = nextProps
            if( !_.isEqual(this.props.kitControllers, kitControllers) ){
                filterCentralOffice(kitControllers.central_offices)
            }
            if(!_.isEqual(this.props.kitTypes,kitTypes )){
                filterItemKitType(kitTypes.kitTypes)
            }
        }

    }),
    pure
)