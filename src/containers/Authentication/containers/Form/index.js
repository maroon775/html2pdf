import {connect} from 'react-redux';
import Form from '../../components/Form';
import actions from '../../actions';

const mapDispatchToProps = dispatch => ({
    init: ()=> dispatch(actions.init()),
    onChangePassword: password => dispatch(actions.setPassword(password)),
    onChangeUsername: username => dispatch(actions.setUsername(username)),
    onLogin: () => dispatch(actions.onLogin())
});
const mapStateToProps = (state) => state.app.authentication;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
