import * as types from "./types";

const defaultState = {
    table: {
        tableHeader: [
            "Name",
            "Number",
            "Created At",
            "Order Code",
            "Promo Name",
            "Price",
            "Provider Name",
            "Status",
            "Actions"
        ],

        tableColumns: [
            "name",
            "number",
            "createdAt",
            "orderCode",
            "promoName",
            "price",
            "providerName",
            "status"
        ],
    },

    orderList: [],
    sortOptions: {
        sortItem: "customer.firstName",
        sortDirection: "Ascending"
    }
}

export default function reducer (state=defaultState, action){
    switch(action.type){
        //add cases here in the future if needed.
        case types.GET_ORDER_LIST:
            return {
                ...state, 
                orderList: action.payload
            };
        case types.SORT_OPTIONS:
            return {
                ...state,
                sortOptions: action.payload
            }

        default: return state;
    }
};