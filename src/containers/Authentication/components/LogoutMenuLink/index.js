import React from 'react';
import propTypes from 'prop-types';
import {Icon, Menu} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';

export default function LogoutMenuLink(props) {
    let history = useHistory();
    
    function onClick() {
        history.push('/');
        props.onLogout();
    }
    
    return <Menu.Menu position='right'>
        <Menu.Item onClick={onClick}>
            <Icon size='large' name='sign out' color='grey'/>
        </Menu.Item>
    </Menu.Menu>;
}

LogoutMenuLink.propTypes = {
    onLogout: propTypes.func.isRequired
};
