import React, {Component} from 'react';
import {
    Header,
    Segment,
    Grid,
    Divider,
} from 'semantic-ui-react';

export default class Html2Pdf extends Component {
    render() {
        return (
            <div>
                <Segment>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>Or</Divider>
                        
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header>Upload zip</Header>
                            </Grid.Column>
                            
                            <Grid.Column>
                                <Header>
                                    Upload html
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}
