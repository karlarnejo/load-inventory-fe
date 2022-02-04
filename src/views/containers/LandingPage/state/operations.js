import apiService from '../../../../utils/apiService';
import * as path from './apiRoutes';
import * as Actions from './actions';

export const listCustomers = () => (dispatch) => {
    return apiService.get(path.GET_CUSTOMER_LIST)
        .then(response => {
            if(response.data.data){
                dispatch(Actions.listCustomers(response.data.data))
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}