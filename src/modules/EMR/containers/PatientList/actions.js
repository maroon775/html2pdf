import {createActions} from 'redux-actions';
import ShadowboxPortal from '@/api/ShadowboxPortal';
import RequestMiddleware from '@/middlewares/request';

const portalApi = new ShadowboxPortal(RequestMiddleware);

const MODULE_PATH = '/app/modules/EMR/containers/PatientList';

export const initState = {
    items: [],
    isLoading: false,
    isError: false,
    errorMessage: null
};

const actions = createActions({
    SET_IS_LOADING: (isLoading) => ({isLoading}),
    SET_ERROR: (errorMessage) => ({
        errorMessage,
        isError: Boolean(errorMessage)
    }),
    SET_ITEMS: (items = []) => ({items})
}, {prefix: MODULE_PATH});

actions.loadPatientsList = () => dispatch => {
    dispatch(actions.setIsLoading(true));
    
    portalApi.getPatientsList()
        .then((response) => {
            if(response.data.errorCode > 0 && response.data.errorMessage) {
                return Promise.reject(response.data.errorMessage);
            }
            
            dispatch(actions.setIsLoading(false));
            if(response.data.object) {
                dispatch(actions.setItems(response.data.object))
            }
        })
        .catch((message) => {
            dispatch(actions.setIsLoading(false));
            dispatch(actions.setError(message));
        });
};

export default actions;
