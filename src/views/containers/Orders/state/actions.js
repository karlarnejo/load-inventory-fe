import * as types from './types';

export const listCustomers = (value) => ({
    type: types.GET_CUSTOMER_LIST,
    payload: value
})

export const sortOptions = (value) => ({
    type: types.SORT_OPTIONS,
    payload: value
})