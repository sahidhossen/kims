import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { getKitController, deleteKitController } from '../../actions/kitControllerActions'
import { userIsAuthenticated } from '../../utils/services'

export default compose(
    connect(store => {
        return { kitControllers: store.kitControllers }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {
        actionType:'',
        isModalOn: false,
        isRoleModalOn: false,
        roleType:null,
        office: null,
        needUpdate: {
            formation: null,
            unit: null,
            quarter: null,
            company: null,
            central: null,
        }
    }),
    withHandlers({
        addKitController: props => type => {
            let {state, setState } = props
            setState({ ...state, actionType: type, isModalOn: true })
        },
        toggleRoleModal: props => (type, office) => {
            let { state, setState } = props
            setState({ ...state, isRoleModalOn: !state.isRoleModalOn, roleType: type, office: office })
        },
        hideRoleModal: props => () => {
            let { state, setState } = props
            setState({ ...state, isRoleModalOn: false, roleType: null, office: null })
        },
        toggleModal: props => () => {
            let { state, setState } = props
            setState({ ...state, isModalOn: !state.isModalOn, actionType: '' })
        },
        goNext: props => (type, office) => {
            let {history:{push} } = props
            push({
                pathname: `/dashboard/${type}/${office.id}`,
                state: { office: office }
            })
        },
        deleteController: props => (type, office, index)=>{
            props.dispatch(deleteKitController(type, office, index))
        },
        onChangeOfficeName: props => (e, office, index, office_type)=> {
            let { kitControllers } = props
            let name = e.target.name
            let value = e.target.value
            let current_office = kitControllers[office_type][index]
            current_office[name] = value
            kitControllers[office_type][index] = current_office;
        },
        enableEditMode: props => (office_type, index) => {
            let { state, setState } = props
            let { needUpdate } = state
            if( office_type === 'formation')
                needUpdate.formation = index
            if( office_type === 'unit')
                needUpdate.unit = index
            if( office_type === 'quarter')
                needUpdate.quarter = index
            if( office_type === 'company')
                needUpdate.company = index
            if( office_type === 'central')
                needUpdate.central = index
            setState({...state, needUpdate})
        }

    }),
    lifecycle({
        componentDidMount() {
            if(this.props.kitControllers.central_offices.length === 0 )
                this.props.dispatch(getKitController())
        },
        componentWillReceiveProps(nextProps){
            console.log("next: ", nextProps.kitControllers)
        }

    }),
    pure
)