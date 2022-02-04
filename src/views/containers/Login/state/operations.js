import * as Actions from "./actions";
import * as Path from './apiRoutes';
import clearAuth from "../../../../utils/clearAuth";
import ApiService from "../../../../utils/apiService";

const loginUser = (email, password) => (dispatch) =>{

    let payload = {
        username: email,
        password: password
    }

    return ApiService.post(Path.LOGIN_USER, payload)
    .then((response)=>{
        if(response.data.data !== null) {
            if(0 < response.data.token.length){
                dispatch(Actions.setUserAuth(response.data.token, true, response.data.data.username));
            }
        }
        return response.data;
    })
    .catch((error)=>{
        console.error(error);
    })
};

const logoutUser = () => (dispatch) =>{
    dispatch(Actions.setUserAuth([], false));
    clearAuth();
};

export{
    loginUser, 
    logoutUser
};
