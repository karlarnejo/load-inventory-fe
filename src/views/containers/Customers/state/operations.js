import apiService from '../../../../utils/apiService';
import * as path from './apiRoutes';
import * as Actions from './actions';

export const listCustomers = (payload) => (dispatch) => {

    return apiService.post(path.GET_CUSTOMER_LIST, payload)
        .then(response => {
            if(response.data.data){
                dispatch(Actions.listCustomers(response.data.data))
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const deleteCustomer = (payload) => () => {

    return apiService.delete(path.DELETE_CUSTOMER, payload)
        .then(response => {
            if(response.data.data){
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}