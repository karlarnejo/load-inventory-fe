import * as types from './types';

export const listOrders = (value) => ({
    type: types.GET_ORDER_LIST,
    payload: value
})

export const sortOptions = (value) => ({
    type: types.SORT_OPTIONS,
    payload: value
})