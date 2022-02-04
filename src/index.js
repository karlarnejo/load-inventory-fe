import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './includes/custom/css/index.css';
import './includes/custom/css/custom-bootstrap.css';
import { Provider } from 'react-redux';
import configureStore, { rootRoutes } from './store.js';
import { 
    BrowserRouter,
    Switch
} from 'react-router-dom';
import PrivateRoute from "./views/components/PrivateRoute";
import CustomRoute from "./views/components/CustomRoute";
import './includes/bootstrap/css/bootstrap.min.css';

const Root = (props) => {
    return (
        <Provider store={configureStore()}>
            <BrowserRouter initialEntries={[props.currentPath]}>
                <Switch>
                    {rootRoutes.map((route, i)=>route.public ? <CustomRoute key={i} exact {...route} /> : <PrivateRoute key={i} {...route}/>)}
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);