import { compose } from 'redux'
import { connect } from 'react-redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { saveKitController } from '../../../actions/kitControllerActions'


export default compose(
    connect(store => {
        return {
            kitControllers: store.kitControllers
        }
    }),
    withState('state', 'setState', {
        central_office: {central_name:'', central_details: '' },
        formation_office: {district_name:'', district_details: '', central_office_id:0 },
        quarter_master: {quarter_name:'', quarter_details: '', central_office_id:0, formation_office_id:0 },
        unit: {unit_name:'', unit_details: '', central_office_id:0, formation_office_id: 0 },
        company: {central_name:'', company_details: '',central_office_id:0, formation_office_id: 0, unit_id:0  },
        error: '',
        filterFormation:[],
        filterQuarterMaster:[],
        filterUnits:[]
    }),
    withHandlers({
        hideModal: props => () => {
            props.closeModal()
        },
        onChangeAction: props => event => {
            let { state, setState, actionType,  kitControllers} = props
            let {
                central_office,
                formation_office,
                quarter_master,
                unit,
                company,
                error,
                filterFormation,
                filterQuarterMaster,
                filterUnits
                } = state

            let name = event.target.name
            let value = event.target.value

            if( actionType === 'central') {
                if( name === 'central_name')
                    central_office.central_name = value;
                if( name === 'central_details' )
                    central_office.central_details = value;
            }

            if( actionType === 'district') {
                if( name === 'district_name')
                    formation_office.district_name = value;
                if( name === 'district_details' )
                    formation_office.district_details = value;
                if( name === 'central_office_id' )
                    formation_office.central_office_id = value;
            }

            if( actionType === 'unit') {
                if( name === 'unit_name')
                    unit.unit_name = value;
                if( name === 'unit_details' )
                    unit.unit_details = value;
                if( name === 'central_office_id' ) {
                    unit.central_office_id = value;
                    filterFormation = kitControllers.formation_offices.filter( office => office.central_office_id === parseInt(value) )
                }
                if( name === 'formation_office_id' ) {
                    unit.formation_office_id = value;
                    filterQuarterMaster = kitControllers.quarters.filter( office => office.district_office_id === parseInt(value) )
                }
            }

            if( actionType === 'company') {
                if( name === 'company_name')
                    company.company_name = value;
                if( name === 'company_details' )
                    company.company_details = value;
                if( name === 'central_office_id' ) {
                    company.central_office_id = value;
                    filterFormation = kitControllers.formation_offices.filter( office => office.central_office_id === parseInt(value) )
                }
                if( name === 'formation_office_id' ) {
                    company.formation_office_id = value;
                    filterUnits = kitControllers.units.filter( office => office.district_office_id === parseInt(value) )
                }
                if( name === 'unit_id' ) {
                    company.unit_id = value;
                }
            }

            if( actionType === 'quarter_master' ){
                if( name === 'quarter_name')
                    quarter_master.quarter_name = value
                if( name === 'quarter_details' )
                    company.quarter_details = value;
                if( name === 'central_office_id' ) {
                    company.central_office_id = value;
                    filterFormation = kitControllers.formation_offices.filter( office => office.central_office_id === parseInt(value) )
                }
                if( name === 'formation_office_id' ) {
                    company.formation_office_id = value;
                    filterUnits = kitControllers.units.filter( office => office.district_office_id === parseInt(value) )
                }
            }

            setState({
                ...props.state,
                central_office,
                formation_office,
                unit,
                company,
                filterFormation,
                filterUnits,
                error
            })
        },
        addController: props => event => {
            event.preventDefault();
            let { actionType, state, setState } = props

            let { central_office, formation_office, unit, company, error } = state

            if( actionType === 'district' ){
                error = formation_office.central_office_id === 0 || formation_office.district_name === '' ? 'Please full up the required field!' : ''
            }
            if( actionType === 'quarter_master' ){
                error = unit.central_office_id === 0 || unit.formation_office_id === 0  || unit.quarter_name === '' ? 'Please full up the required field!' : ''
            }
            if( actionType === 'unit' ){
                error = unit.central_office_id === 0 || unit.formation_office_id === 0  || unit.unit_name === '' ? 'Please full up the required field!' : ''
            }

            if( actionType === 'company' ){
                error = company.central_office_id === 0 || company.formation_office_id === 0 || company.unit_id === 0 || company.company_name === '' ? 'Please full up the required field!' : ''
            }

            if( actionType === 'central' ){
                error = central_office.central_name === '' ? "Please fill up the required field!" : '';
            }

            if( error !== '' ){
                setState({ ...state, error })
                return false;
            }else {
                props.dispatch(saveKitController(state, actionType))
            }

        }
    }),
    lifecycle({
        componentDidMount() {
            // let { user, actionType } = this.props
            // if( actionType === true )
            //     this.props.setState({...this.props.state, user: user })

        },
        componentWillReceiveProps(nextProps){
            let { state, setState, kitControllers } = nextProps
            if( !_.isEqual(this.props.kitControllers, kitControllers) ){
                console.log(state.actionType + ' added success!');
            }
        }
    }),
    pure
)