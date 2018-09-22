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
        kitType: { type_name: '', details:'', problems: null, id:0, image:null, image_file:null, index:null },
        error: '',
        img_upload_status: false,
        isUpdate: false,
        selected_type: null,
        isItemProblemModal: false,
        type_index: null
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
            error = kitType.kit_name === '' || kitType.image === null ? 'Please check kit name or image!' : ''
            if(error === '') {
                props.dispatch(addKitType(kitType))
            }else {
                setState({...state, error })
            }
        },
        kitTypeEditAction: props => (e, index) => {
            let { kitTypes, state, setState } = props
            let {kitType} = state
            kitType = kitTypes.kitTypes[index]
            kitType.index = index
            setState({...state, kitType , isUpdate: true })
            window.scrollTo(0,0)
        },
        openModal: props => index => {
            let { state, setState, kitTypes: {kitTypes} } = props;
            setState({...state, isItemProblemModal: !state.isItemProblemModal, selected_type: kitTypes[index], type_index: index })
        },
        onImageRemove: props => () => {
            let { state, setState } = props
            let {kitType } = state
            kitType.image = null
            kitType.image_file = null
            setState({ kitType, img_upload_status: false });
        },
        onImageDrop: props => file => {
            let { state, setState } = props
            let {kitType} = state
            kitType.image = file[0].preview
            kitType.image_file = file[0]
            setState({ kitType, img_upload_status: true })
        }
    }),
    lifecycle({
        componentDidMount() {
            if( this.props.kitTypes.kitTypes.length === 0)
                this.props.dispatch(getKitTypes())
        },
        componentWillReceiveProps(nextProps){
            let {kitTypes} = nextProps
            let { state, setState } = this.props
            if( !_.isEqual(kitTypes, this.props.kitTypes) && state.kitType.type_name !== ''){
                if(kitTypes.fetched === true ){
                    let { kitType } = state
                    kitType = { type_name: '', details:'', id:0, image:null, problems: null, image_file:null, index:null },
                    setState({...state, kitType, img_upload_status: false  })
                }
            }
        }

    }),
    pure
)