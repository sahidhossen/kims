import App from '../container/Layout/App'
import Dashboard from '../container/Layout/Dashboard'
import AuthDashboard from '../container/Layout/AuthDashboard'
import Home from './Home'
import DefaultHome from './DefaultHome'
import User from './Users'
import CreateUser from './CreateUser'
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
                    path: route.CREATE_USERS,
                    exact: true,
                    component: CreateUser
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