import React, {Component} from 'react';
import {
    Header,
    Grid,
} from 'semantic-ui-react';
import {Route} from 'react-router-dom';
import PatientList from './containers/PatientList';
import PatientInfo from './containers/PatientInfo';

export default class EMR extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row verticalAlign="top">
                    <Grid.Column width={6}>
                        <Header>PATIENT LIST</Header>
                        <PatientList />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Route path="/emr/patient/:patientId" render={(props) => <PatientInfo {...props} />} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
