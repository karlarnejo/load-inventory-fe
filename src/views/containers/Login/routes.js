import LoginScreen from './LoginScreen'

export const LOGIN_ROUTE = "/login";

export const routes = [
    {
        path: LOGIN_ROUTE,
        component: LoginScreen,
        exact: true,
        public: true
    }
];