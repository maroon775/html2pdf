import {combineReducers} from 'redux';
import app from '../containers/reducer';
import emr from '../modules/EMR/reducer';

export default combineReducers({
    app,
    emr
});
