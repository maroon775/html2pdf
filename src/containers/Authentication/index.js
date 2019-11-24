import React, {Component} from 'react';
import propTypes from 'prop-types';
import AuthPage from './components/Page';
import {connect} from 'react-redux';

const mapStateToProps = state => state.app.authentication;

class Authentication extends Component {
    render() {
        return (this.props.isAuthenticated ? this.props.children : <AuthPage/>);
    }
}

Authentication.propTypes = {
    isAuthenticated: propTypes.bool.isRequired
};

export default connect(mapStateToProps)(Authentication);
