import PatientInfo from '../../components/PatientInfo';
import actions from './actions';
import {connect} from 'react-redux';

const mapStateToProps = (state) => state.emr.patientInfo;
const mapDispatchToProps = (dispatch) => ({
    loadPatientInfo: (id) => dispatch(actions.loadPatientInfo(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientInfo);
