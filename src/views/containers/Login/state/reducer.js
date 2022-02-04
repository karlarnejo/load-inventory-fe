import * as types from "./types";

const defaultState = {
    credentials:[{
        authToken: "",
    }],
    isAuthenticated: false
};

export default function reducer (state=defaultState, action) {
    switch (action.type) {
        case types.SET_USER_AUTH:
            return {...state, credentials: action.payload, isAuthenticated: action.isAuthenticated};
        default: return state;
    }
};