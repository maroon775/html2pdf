import {createActions} from 'redux-actions';
import ShadowboxAuth from '@/api/ShadowboxAuth';
import RequestMiddleware from '@/middlewares/request';

const MODULE_PATH = '/app/containers/Authentication';
const authApi = new ShadowboxAuth(RequestMiddleware);

export const initState = {
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    username: '',
    password: '',
    errorMessage: null
};

const storage = {
    set: (data) => localStorage.setItem(MODULE_PATH, JSON.stringify(data)),
    get: () => {
        const data = localStorage.getItem(MODULE_PATH);
        if(data) {
            return JSON.parse(data);
        }
        return null;
        
    },
    remove: () => localStorage.removeItem(MODULE_PATH),
};

const actions = createActions({
    SET_PASSWORD: password => ({
        password,
        errorMessage: ''
    }),
    SET_USERNAME: username => ({
        username,
        errorMessage: ''
    }),
    SET_ACCESS_TOKEN: accessToken => ({accessToken}),
    SET_ERROR_MESSAGE: errorMessage => ({errorMessage}),
    SET_IS_AUTHENTICATED: isAuthenticated => ({isAuthenticated}),
    SET_IS_LOADING: isLoading => ({isLoading}),
    RESET_STATE: () => initState
}, {prefix: MODULE_PATH});

actions.init = () => (dispatch, getState) => {
    const storageData = storage.get();
    
    if(storageData && storageData.expire && Date.now() < storageData.expire) {
        dispatch(actions.setAccessToken(storageData.accessToken));
        dispatch(actions.setIsAuthenticated(true));
    }
};

actions.onLogin = () => (dispatch, getState) => {
    const state = getState().app.authentication;
    
    dispatch(actions.setIsLoading(true));
    
    authApi.postSecurityLogin(state.username, state.password)
        .then((response) => {
            dispatch(actions.setIsLoading(false));
            if(response.data.errorCode > 0) {
                return Promise.reject(response.data.errorMessage);
            }
            
            if(response.data.object && response.data.object.access_token) {
                dispatch(actions.setAccessToken(response.data.object.access_token));
                dispatch(actions.setIsAuthenticated(true));
                
                storage.set({
                    accessToken: response.data.object.access_token,
                    expire: (Date.now() + (60 * 60 * 24 * 1000))
                });
            }
        })
        .catch((message) => {
            dispatch(actions.setIsLoading(false));
            dispatch(actions.setErrorMessage(message));
        });
};

actions.onLogout = () => (dispatch) => {
    dispatch(actions.resetState());
    storage.remove();
};

export default actions;
