import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { authOperations } from '../containers/Login/state';
import MainHeader from './MainHeader';
import { LOGIN_ROUTE } from '../containers/Login/routes';

const PrivateRoute = (props) => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    // const user = useSelector(state => state.auth.account)
    // const logoutUser = authOperations.logoutUser

    return isAuthenticated ?
        <div>
            {/* <MainHeader {...props} isAuthenticated={isAuthenticated} logoutUser={logoutUser}/> */}
            <Route path={props.path} component={props.component} />
        </div>
        : (
            <Redirect to={{
                pathname: LOGIN_ROUTE,
                state: {
                    from: props.location
                }
            }} />
        )
}

export default PrivateRoute;