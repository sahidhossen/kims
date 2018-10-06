import App from '../container/Layout/App'
import Dashboard from '../container/Layout/Dashboard'
import AuthDashboard from '../container/Layout/AuthDashboard'
import Home from './Home'
import DefaultHome from './DefaultHome'
import User from './Users'
import CompanyUsers from './company_users'
import AddSoldier from './AddSoldier'
import UserDetails from './Users/UserDetails'
import KitController from './KitController'
// import KitControllerDetails from './KitController/KitControllerDetails'
import KitItems from './KitItems'
import ItemTypes from './ItemTypes'
import CentralPendingRequest from './CenrtalPendingRequest'
import Condemnation from './Condemnation'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import * as route from '../constants'

const routes = [{
    component: App,
    routes: [
        {
            path: "/",
            exact: true,
            component: DefaultHome
        },
        {
            path: "/login",
            exact: true,
            component: Login
        },
        {
            path: "/register",
            exact: true,
            component: Register
        },

        {
            path: "/dashboard",
            component: Dashboard,
            routes: [
                {
                    path: '/dashboard',
                    exact: true,
                    auth: true,
                    component: Home
                },
                {
                    path: route.USERS,
                    exact: true,
                    component: User
                },
                {
                    path: route.CONTROLLER,
                    exact: true,
                    component: KitController
                },
                {
                    path: route.PENDING_REQUEST,
                    exact: true,
                    component: CentralPendingRequest
                },

                {
                    path: route.KIT_ITEMS,
                    exact: true,
                    component: KitItems
                },
                {
                    path: route.ITEM_TYPES,
                    exact: true,
                    component: ItemTypes
                },
                {
                    path: route.USER_DETAILS,
                    exact: true,
                    component: UserDetails
                },
                {
                    path: route.CONDEMNATION,
                    exact: true,
                    component: Condemnation
                },
                {
                    path: route.COMPANY_ADD_USERS,
                    exact: true,
                    component: AddSoldier
                },
                {
                    path: route.COMPANY_USERS,
                    exact: true,
                    component: CompanyUsers
                },
                {
                    path: "/*",
                    exact:true,
                    component: NotFound
                }
            ]
        },
        {
            path: "*",
            exact:true,
            component: NotFound
        },

    ]
}]

export default routes