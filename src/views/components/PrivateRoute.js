import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory, Redirect } from 'react-router-dom';
// import { authOperations } from '../containers/Login/state';
// import MainHeader from './MainHeader';
import Sidebar from './Sidebar'
import { RiMessage3Line, RiChat4Fill, RiTeamFill, RiTaskFill, RiPieChart2Fill, RiLogoutBoxFill, RiTruckFill } from 'react-icons/ri';
import { LOGIN_ROUTE } from '../containers/Login/routes';
import { authOperations } from '../containers/Login/state';
import { collapseSidebar as collapseSidebarFnc } from '../containers/Landing/state/actions';
import { ROOT, CUSTOMER, ORDER } from "../../config/settings";

const PrivateRoute = (props) => {

    const dispatch = useDispatch();
    const history = useHistory()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const collapseSidebar = useSelector(state => state.landingePage.collapseSidebar)

    const logoutUser = authOperations.logoutUser
    const handleToggleSidebar = () => collapseSidebar ? dispatch(collapseSidebarFnc(false)) : dispatch(collapseSidebarFnc(true))

    return isAuthenticated ?
        <div>
            <Sidebar
                collapseSidebar={collapseSidebar}
                handleToggleSidebar={() => handleToggleSidebar()}
                sidebarLogo={"LOGO"}
                sidebarItems={[
                    { icon: <RiMessage3Line className="sidebar-icon" />, name: "Dashboard", onclick: (() => history.push(ROOT)) },
                    { icon: <RiTruckFill className="sidebar-icon" />, name: "Orders", onclick: (() => history.push(ORDER)) },
                    { icon: <RiTeamFill className="sidebar-icon" />, name: "Customers", onclick: (() => history.push(CUSTOMER)) },
                    { icon: <RiTaskFill className="sidebar-icon" />, name: "Tasks" },
                    { icon: <RiPieChart2Fill className="sidebar-icon" />, name: "Analytics" },
                    { icon: <RiLogoutBoxFill className="sidebar-icon" />, name: "Logout", onclick: (() => dispatch(logoutUser())) }
                ]}
            />

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