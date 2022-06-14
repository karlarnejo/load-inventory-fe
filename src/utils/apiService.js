import axios from 'axios';
import { REST_SERVICE_URL_ROOT, CLIENT_ID, CLIENT_SECRET, PERSISTED_STATE_KEY } from '../config/settings';
import Qs from 'qs';
import { Route } from 'react-router-dom';
import Error404 from '../views/containers/Errors/404'

class ApiService {
  constructor() {
    
    axios.defaults.baseURL = REST_SERVICE_URL_ROOT;
    
    let service = axios.create();
    
    //Request Interceptor
    service.interceptors.request.use(function (config) {
      try{
        config.paramsSerializer = params => {
          // Qs is already included in the Axios package
          return Qs.stringify(params, {
            arrayFormat: "brackets",
            encode: false
          });
        };

        let token = JSON.parse(localStorage.getItem(PERSISTED_STATE_KEY)).auth.credentials

        if (token !== "" && token !== undefined) {
          //Change depending on your authorization token variable
          config.headers.common['Authorization'] = 'Bearer ' + token;
          config.headers.common['Content-Type'] = 'application/json';
          config.headers.common['Access-Control-Allow-Origin'] = REST_SERVICE_URL_ROOT;
        }
      }catch{
        console.log("Unauthorized");
      }
      
      // Do something before request is sent
      return config;
    }, function (error) {
      // Do something with request error
      this.handleError(error)
      return Promise.reject(error);
    });

    //Response Interceptor
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  //Update actions for error handling
  handleError = (error) => {
    
    const status = error.response ? error.response.status : null;
    
    switch (status) {
      case 401:
        console.error("heha",error);
        break;
      case 404:
        console.error("daerror",error);
            <Route 
                // exact={props.exact}
                // path={props.path} 
                component={Error404}
            />
        break;
      default:
        console.error(error);
        break;
    }
    return Promise.reject(error);
  }

  redirectTo = (document, path) => {
    document.location = path;
  }
  
  get(path) {
    return this.service.get(path);
  }

  token(payload) {
    let params = new URLSearchParams();
    params.append('username', payload.username);
    params.append('password', payload.password);
    params.append('grant_type', "password");
    
    return this.service.request({
      method: 'POST',
      url: REST_SERVICE_URL_ROOT+"/oauth/token",
      responseType: 'json',
      params: params,
      headers: {
        "Authorization": "Basic "+btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => { return response});
  }
  
  patch(path, payload) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => {return response});
  }

  post(path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => {return response});
  }

  delete(path, payload) {
    return this.service.request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => {return response});
  }
}

export default new ApiService();