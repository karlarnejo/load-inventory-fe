import * as types from './types';

export const listCustomers = (value) => ({
    type: types.GET_CUSTOMER_LIST,
    payload: value
})