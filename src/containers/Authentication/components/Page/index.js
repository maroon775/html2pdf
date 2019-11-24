import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import Form from '../../containers/Form';

export default class Page extends Component {
    render() {
        return (
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Form size='large'/>
                </Grid.Column>
            </Grid>
        );
    }
}

Page.propTypes = {};
