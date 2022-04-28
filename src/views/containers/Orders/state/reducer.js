import * as types from "./types";

const defaultState = {
    table: {
        tableHeader: [
            "Name",
            "Number",
            // "Order Code",
            "Promo Name",
            "Price",
            // "Discount",
            "Provider Name",
            "Status",
            "Created At",
            "Updated At",
            "Actions"
        ],

        tableColumns: [
            "name",
            "number",
            // "orderCode",
            "promoName",
            "price",
            // "discount",
            "providerName",
            "statusMeaning",
            "createdAt",
            "updatedAt"
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