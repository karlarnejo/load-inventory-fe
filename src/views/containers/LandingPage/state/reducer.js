import * as types from "./types";

const defaultState = {
    table: {
        tableHeader: [
            "First Name",
            "Last Name",
            "Middle Name",
            "Address",
            "Contact No.",
            "Gender",
            "Action"
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

    customerList: [],
    sortOptions: {
        sortItem: "firstName",
        sortDirection: "Ascending"
    }
}

export default function reducer (state=defaultState, action){
    switch(action.type){
        //add cases here in the future if needed.
        case types.GET_CUSTOMER_LIST:
            return {
                ...state, 
                customerList: action.payload
            };
        case types.SORT_OPTIONS:
            return {
                ...state,
                sortOptions: action.payload
            }

        default: return state;
    }
};