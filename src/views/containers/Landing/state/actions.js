import * as types from './types';

export const collapseSidebar = (value) => ({
    type: types.SIDEBAR_COLLAPSE,
    payload: value
})