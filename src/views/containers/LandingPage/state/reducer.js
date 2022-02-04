import { act } from "react-dom/test-utils";
import * as types from "./types";

const defaultState = {
    table: {
        tableHeader: [
            "First Name",
            "Last Name",
            "Middle Name",
            "Address",
            "Contact No.",
            "Gender"
        ],

        tableColumns: [
            "firstName",
            "lastName",
            "middleName",
            "address",
            "contactNo",
            "gender"
        ],
    },

    customerList: []
}

export default function reducer (state=defaultState, action){
    switch(action.type){
        //add cases here in the future if needed.
        case types.GET_CUSTOMER_LIST:
            return {
                ...state, 
                customerList: action.payload
            };

        default: return state;
    }
};