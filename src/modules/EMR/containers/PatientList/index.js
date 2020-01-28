import {connect} from 'react-redux';
import PatientList from '../../components/PatientList';
import actions from './actions';

const mapDispatchToProps = (dispatch) => ({
    loadPatientsList: () => dispatch(actions.loadPatientsList()),
});
const mapStateToProps = (state) => state.emr.patientList;

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
