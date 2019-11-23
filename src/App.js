import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './assets/style.css';

import config from '@/config';
import Layout from "@/containers/Layout";
import Navbar from "@/components/Navbar";
import {Segment, Grid} from "semantic-ui-react";

export default class App extends Component {
    render()
    {
        return <Router>
            <Layout>
                <Grid centered padded>
                    <Grid.Row>
                        <Grid.Column width={14}>
                            <Navbar items={config.routes}/>
                            <Segment attached='bottom'>
                                <Switch>
                                    {
                                        config.routes.map((route, index) => <Route
                                            key={index}
                                            exact={route.exact}
                                            path={route.path}
                                            render={props => (<route.component {...props}/>)}
                                        />)
                                    }
                                </Switch>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
            </Layout>
        </Router>;
    }
}
