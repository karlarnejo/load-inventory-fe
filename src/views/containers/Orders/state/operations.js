import apiService from '../../../../utils/apiService';
import * as path from './apiRoutes';
import * as Actions from './actions';

export const listOrders = (payload) => (dispatch) => {

    return apiService.post(path.GET_ORDER_LIST, payload)
        .then(response => {
            if(response.data.data){
                dispatch(Actions.listOrders(response.data.data))
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const listCustomerNames = (payload) => (dispatch) => {

    return apiService.post(path.SEARCH_NAME, payload)
        .then(response => {
            if(response.data.data){
                // dispatch(Actions.listOrders(response.data.data))
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const listPromoNames = (payload) => (dispatch) => {

    return apiService.post(path.SEARCH_PROMONAME, payload)
        .then(response => {
            if(response.data.data){
                // dispatch(Actions.listOrders(response.data.data))
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const listProviderNames = (payload) => (dispatch) => {

    return apiService.post(path.SEARCH_PROVIDERNAME, payload)
        .then(response => {
            if(response.data.data){
                // dispatch(Actions.listOrders(response.data.data))
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const deleteOrders = (payload) => () => {

    return apiService.delete(path.DELETE_ORDER, payload)
        .then(response => {
            //TODO: find something for then() or remove it.
            if(response.data.data){
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const saveOrders = (payload) => () => {
    
    return apiService.post(path.SAVE_ORDER, payload)
        .then(response => {
            //TODO: find something for then() or remove it.
            if(response.data.data) {
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const updateOrders = (payload) => () => {
    
    return apiService.post(path.UPDATE_ORDER, payload)
        .then(response => {
            //TODO: find something for then() or remove it.
            if(response.data.data) {
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}