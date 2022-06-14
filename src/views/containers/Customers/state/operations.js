import apiService from '../../../../utils/apiService';
import * as path from './apiRoutes';
import * as Actions from './actions';
import { RequestParamSetter } from '../../../../utils/RequestParamSetter';

export const listCustomers = (payload) => (dispatch) => {

    let toBuildObject = []
    let parameters = "" 

    /*
        loop to payload and create a json with parameter and value to be used in RequestParamSetter.
    */
    for (var key in payload) {
        let tempObject = {}
        if (payload.hasOwnProperty(key)) {
            if(payload[key]) {

                tempObject["param"] = key
                tempObject["data"] = payload[key]

                toBuildObject.push(tempObject)
            }
        }
    }

    parameters = RequestParamSetter(toBuildObject)

    return apiService.get(path.GET_CUSTOMER_LIST+parameters.toString())
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
            //TODO: find something for then() or remove it.
            if(response.data.data){
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const saveCustomer = (payload) => () => {
    
    return apiService.post(path.SAVE_CUSTOMER, payload)
        .then(response => {
            //TODO: find something for then() or remove it.
            if(response.data.data) {
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}

export const updateCustomer = (payload) => () => {
    
    return apiService.post(path.UPDATE_CUSTOMER, payload)
        .then(response => {
            //TODO: find something for then() or remove it.
            if(response.data.data) {
                return response.data.data;
            }
        }).catch(error => {
            throw error;
        });
}