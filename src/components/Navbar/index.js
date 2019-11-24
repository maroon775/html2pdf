import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Menu, Icon} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import LogoutMenuLink from '@/containers/Authentication/containers/LogoutMenuLink';

export default class Navbar extends Component {
    renderItems() {
        return this.props.items.map((route, index) => {
            return <Menu.Item
                key={index}
                as={NavLink}
                activeClassName="active"
                exact
                to={route.path}
            >{route.label}</Menu.Item>;
        });
    }
    
    render() {
        return (
            <Menu pointing inverted size='tiny' attached='top' stackable>
                {this.renderItems()}
                <LogoutMenuLink/>
            </Menu>
        );
    }
}

Navbar.propTypes = {
    items: propTypes.array.isRequired,
};
