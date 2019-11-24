import React, {Component} from 'react';
import Authentication from '../Authentication';

export default class Layout extends Component {
    render() {
        return (<Authentication>{this.props.children}</Authentication>);
    }
}
