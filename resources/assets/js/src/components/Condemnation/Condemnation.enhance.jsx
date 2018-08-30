import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import moment from 'moment'
import { userIsAuthenticated } from '../../utils/services'
import { getKitController } from '../../actions/kitControllerActions'
import { addCondemnation, getCondemnations, deleteCondemnation } from '../../actions/condemnationActions'

export default compose(
    connect(store => {
        return {
            kitControllers: store.kitControllers,
            condemnations: store.condemnations
        }
    }),
    userIsAuthenticated,
    withState('state', 'setState', {
        condemnation:{
            condemnation_name:'',
            _condemnation_date: moment(),
            central_office_id:0,
            district_office_id:0,
            unit_id:0,

        },
        condemnation_id: null,
        centralOfficeOptions:[],
        districtOfficeOptions:[],
        unitOfficeOptions:[],
        error:''
    }),
    withHandlers({
        onChangeAction: props => event => {
            let { state, setState, kitControllers } = props
            let { districtOfficeOptions, condemnation, unitOfficeOptions } = state
            let name = event.target.name
            let value = event.target.value

            if(name === 'central_office_id'){
                condemnation.central_office_id = value
                districtOfficeOptions = kitControllers.formation_offices.filter( office => office.central_office_id === parseInt(value) )
            }

            if( name === 'district_office_id'){
                condemnation.district_office_id = value
                unitOfficeOptions = kitControllers.units.filter( office => office.district_office_id === parseInt(value) )
            }

            if(name==='unit_id')
                condemnation.unit_id = value

            if(name === 'condemnation_name'){
                condemnation.condemnation_name = value
            }

            setState({ ...state, condemnation, districtOfficeOptions, unitOfficeOptions })

        },
        onChangeSelectAction: props => (option, name) => {
            let { state, setState } = props
            let { condemnation } = state

            if(name === 'condemnation_date'){
                condemnation._condemnation_date = option
            }
            setState({ ...state, condemnation })
        },
        addCondemnation: props => event => {
            let { state, setState, dispatch } = props
            let { error, condemnation } = state;
            error = condemnation._condemnation_date === '' ||
                    condemnation.condemnation_name === '' ||
                    condemnation.central_office_id === 0 ||
                    condemnation.district_office_id === 0 ||
                    condemnation.unit_id === 0 ?
                    'Please fill up required field!' : ''
            if( error === '' ){
                condemnation.condemnation_date = moment(condemnation._condemnation_date).format('YYYY-MM-DD h:mm:ss')
                dispatch(addCondemnation(condemnation))
            }else {
                setState({ ...state, error})
            }
        },
        condemnationDeleteAction: props => (index, condemnation_id ) => {
            props.dispatch( deleteCondemnation(index, condemnation_id) )
        },
        condemnationEditAction: props => (e, index) => {
            let { condemnations, state, setState } = props
            let { condemnation, condemnation_id } = state
            const currentCondemnation = condemnations.condemnation[index];
            let { condemnation_name, condemnation_date, id, terms: { central_id, district_id, unit_id } } = currentCondemnation
            condemnation._condemnation_date = moment(condemnation_date)
            condemnation.condemnation_name = condemnation_name
            condemnation.central_office_id = central_id
            condemnation.district_office_id = district_id
            condemnation.unit_id = unit_id
            condemnation_id = id
            setState({...state, condemnation, condemnation_id })
            console.log(condemnation)
        }
    }),
    lifecycle({
        componentDidMount() {
            if(this.props.kitControllers.central_offices.length === 0 )
                this.props.dispatch(getKitController())
            this.props.dispatch(getCondemnations())
        },
        componentWillReceiveProps(nextProps){
            let { condemnations } = nextProps
            if(!_.isEqual(condemnations, this.props.condemnations) && condemnations.error !== null ){
                let { state, setState } = this.props
                setState({...state, error: condemnations.error })
            }
            console.log("cond: ", condemnations)
        }

    }),
    pure
)