import React, {Component} from 'react';
import propTypes from 'prop-types';
import {
    Form as UIForm,
    Input,
    Button,
    Header,
    Icon,
    Segment,
    Message
} from "semantic-ui-react";

export default class Form extends Component {
    componentDidMount()
    {
        this.props.init();
    }
    
    onLogin = () => {
        this.props.onLogin();
    };
    onSubmit = event => {
        event.preventDefault();
        this.props.onLogin()
    };
    
    onChangeUsername = event => {
        this.props.onChangeUsername(event.target.value);
    };
    onChangePassword = event => {
        this.props.onChangePassword(event.target.value);
    };
    
    renderError()
    {
        return this.props.errorMessage && <Message
            error
            content={this.props.errorMessage}
        />;
    }
    
    render()
    {
        return (<div><Header as='h3' inverted color='black' textAlign='center'>
                <Icon circular color='black' name='window restore outline'/> Sign in | Shadowbox tools
            </Header>
                <Segment>
                    <UIForm
                        loading={this.props.isLoading}
                        size={this.props.size}
                        onSubmit={this.onSubmit}
                        
                        {...(this.props.errorMessage ? {error:true} : {})}
                    >
                        
                        
                        <UIForm.Field>
                            <Input
                                onChange={this.onChangeUsername}
                                value={this.props.username}
                                placeholder='Login'
                                type='text'
                            />
                        </UIForm.Field>
                        <UIForm.Field>
                            <Input
                                onChange={this.onChangePassword}
                                value={this.props.password}
                                placeholder='Password'
                                type='password'
                                action={
                                    <Button
                                        onClick={this.onLogin}
                                        type='button'
                                        icon='angle right'
                                    />
                                }
                            />
                        </UIForm.Field>
                        
                        {this.renderError()}
                    </UIForm>
                </Segment>
            </div>
        );
    }
}

Form.propTypes = {
    isLoading   :propTypes.bool,
    username    :propTypes.string,
    password    :propTypes.string,
    errorMessage:propTypes.string,
    
    init            :propTypes.func.isRequired,
    onLogin         :propTypes.func.isRequired,
    onChangeUsername:propTypes.func.isRequired,
    onChangePassword:propTypes.func.isRequired,
    
    size:propTypes.oneOf(['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive'])
};
