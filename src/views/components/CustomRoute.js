import React from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = (props) => {
    return(
        <Route 
            exact={props.exact}
            path={props.path} 
            component={props.component}
        />
    );
};

export default CustomRoute;