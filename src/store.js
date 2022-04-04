import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import throttle from 'lodash/throttle';
import createSagaMiddleware from 'redux-saga';
import { PERSISTED_STATE_KEY } from './config/settings';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

//Modules imports
import Login from './views/containers/Login/state';
import Error404 from './views/containers/Errors/404';
import CustomerPage from './views/containers/Customers/state';
import LandingPage from './views/containers/Landing/state';

//Store methods
const loadState = () => {
    try {
        const serializedState = localStorage.getItem(PERSISTED_STATE_KEY);
        return null === serializedState ? undefined : JSON.parse(serializedState);
    } catch (e) { return undefined; }
};

const saveState = (state) => {
    try {
        localStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(state));
    } catch (e) { }
};


//Module Reducers
const rootReducer = combineReducers({
    auth: Login.reducer,
    customerPage: CustomerPage.reducer,
    landingePage: LandingPage.reducer
});

//Module Routes
export const rootRoutes = [
    ...Login.routes,
    ...CustomerPage.routes,
    ...LandingPage.routes,
    {component: Error404}
]

//Module sagas
function* rootSaga() {
    yield all([
        //Insert module sagas
    ])
}

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(
    thunkMiddleware,
    logger,
    sagaMiddleware
);

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(middleware)
);


export default function configureStore() {
    store.subscribe(throttle(() => {
        saveState(store.getState());
    }), 1000);

    sagaMiddleware.run(rootSaga)

    return store;
};
