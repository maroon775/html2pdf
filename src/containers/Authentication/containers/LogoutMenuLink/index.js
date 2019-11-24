import LogoutMenuLink from '../../components/LogoutMenuLink';
import {connect} from 'react-redux';
import actions from '../../actions';

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.onLogout())
});

export default connect(null, mapDispatchToProps)(LogoutMenuLink);
