import {combineReducers} from 'redux';
import patientList from './containers/PatientList/reducer';
import patientInfo from './containers/PatientInfo/reducer';

export default combineReducers({
    patientList,
    patientInfo
})
