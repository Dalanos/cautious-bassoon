import React, { Component } from 'react';
import {
  NavLink,
} from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const SignUpMessage = () => (
  <Message>
    New to us? <NavLink to="/TicTacToe">Sign Up</NavLink>
  </Message>
)

function ErrorMessage(props){
  if(!props.error) {
    return null;
  }

  return(
      <Message negative>
        <Message.Header>Authentication failed</Message.Header>
        <p>Your e-mail address is unknown or you password is incorrect</p>
      </Message>
  );
}

class FormAuthentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.onFormAuthenticationSubmit(this.state.email, this.state.password);
  }

  render() {
    const { email, password} = this.state;
    const error = this.props.error;

    return (
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name='email'
              value={email}
              onChange={this.handleChange}
              error={error}
              />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name='password'
              value={password}
              type='password'
              onChange={this.handleChange}
              error={error}
            />
            <Button color='teal' fluid size='large'>
              Login
            </Button>
            <ErrorMessage error={error} />
        </Segment>
      </Form>
    );
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      error : false,
    }
    this.handleFormAuthenticationSubmit = this.handleFormAuthenticationSubmit.bind(this);
  }

  handleFormAuthenticationSubmit(email, password) {
    //TODO: Authentication implementation
    let error  = this.state.error;
    if(email === "admin" && password === "admin"){
      error=false;
    } else {
      error=true;
    }
    this.setState({
      error: error,
    });
  }

  render() {
    return(
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <FormAuthentication error={this.state.error} onFormAuthenticationSubmit={this.handleFormAuthenticationSubmit}/>
            <SignUpMessage/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginPage
