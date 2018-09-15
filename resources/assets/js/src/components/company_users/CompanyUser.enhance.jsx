import { compose } from 'redux'
import { pure, lifecycle, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { fetchUserByCompany, addUser } from '../../actions/userActions'
import { userIsAuthenticated } from '../../utils/services'

export default compose(
    connect(store => {
        return { oauth: store.oauth, users: store.users}
    }),
    userIsAuthenticated,
    withState('state', 'setState', {searchResult:[], switchToSearch: false, searchTxt:'' }),
    withHandlers({
         onSoldierSearch: props => event => {
             let { state, setState, users } = props
             let { searchResult, switchToSearch, searchTxt } = state
             let searchValue = event.target.value
             if (searchValue.length === 0){
                 setState({...state, searchTxt: searchValue, switchToSearch: false })
             }else {
                 searchResult = users.users.filter(
                     c => c.name.toLowerCase().search(searchTxt.toLowerCase()) !== -1
                 )
                 setState({
                     ...state,
                     searchTxt: searchValue,
                     searchResult,
                     switchToSearch: true
                 })
             }
         }
    }),
    lifecycle({
        componentDidMount(){
            let{ users } = this.props
            if( users.users.length === 0 ){
                this.props.dispatch(fetchUserByCompany());
            }
        },
        componentWillReceiveProps(nextProps){

        }
    }),
    pure
)