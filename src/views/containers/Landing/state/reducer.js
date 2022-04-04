import * as types from "./types";

const defaultState = {
    collapseSidebar: false
}

export default function reducer (state=defaultState, action){
    switch(action.type){
        //add cases here in the future if needed.
        case types.SIDEBAR_COLLAPSE:
            return {
                ...state, 
                collapseSidebar: action.payload
            };

        default: return state;
    }
};