import {createActions} from 'redux-actions';
import requestMiddleware from '@/middlewares/request';
import shadowboxPortal from '@/api/ShadowboxPortal';
import {deepParseJson} from 'deep-parse-json';

const shadowboxPortalApi = new shadowboxPortal(requestMiddleware);

const MODULE_PATH = '/app/modules/EMR/containers/PatientInfo';

export const initState = {
    id: null,
    patientId: null,
    name: '',
    lastname: '',
    content: '',
    contentData: null,
    
    isLoading: false,
    isError: false,
    errorMessage: null,
};

const actions = createActions({
    SET_DATA: ({
        id,
        patientId,
        name,
        lastname,
        content,
        contentData,
    }) => ({
        id,
        patientId,
        name,
        lastname,
        content,
        contentData,
    }),
    
    SET_IS_LOADING: (isLoading) => ({isLoading}),
    SET_ERROR: (errorMessage) => ({
        errorMessage,
        isError: Boolean(errorMessage)
    }),
}, {prefix: MODULE_PATH});


function convertContent(content){
    return content ? atob(content) : null
}

actions.loadPatientInfo = (id) => dispatch => {
    dispatch(actions.setIsLoading(true));
    
    shadowboxPortalApi.getPatientById(id)
        .then(({data: {errorCode, errorMessage, object: responseData}}) => {
            console.log(responseData, errorMessage, errorCode);
            if(errorCode > 0 && errorMessage) {
                return Promise.reject(errorMessage);
            }
            
            dispatch(actions.setIsLoading(false));
            if(responseData) {
                responseData.content = convertContent(responseData.content);
                if(responseData.content)
                    responseData.contentData = deepParseJson(responseData.content);
                
                if(responseData.patient_id) {
                    responseData.patientId = responseData.patient_id;
                }
                
                console.log(responseData.contentData, Date.now());
                
                
                
                dispatch(actions.setData(responseData));
            }
        })
        .catch((message) => {
            dispatch(actions.setIsLoading(false));
            dispatch(actions.setError(message));
        });
    
};


export default actions;
