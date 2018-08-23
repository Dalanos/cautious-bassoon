import React, { Component } from 'react';
import {
  NavLink,
  Redirect,
} from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'
import { withCookies } from 'react-cookie';
import axios from 'axios';

import * as constants from '../CONSTANTS';

import "./LoginPage.css"

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
        <Segment stacked className="segment_background">
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
            <Button color='blue' fluid size='large'>
              Login
            </Button>
            <ErrorMessage error={error} />
        </Segment>
      </Form>
    );
  }
}

class LoginPage extends Component {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };

  constructor(props) {
    super(props);
    this.state= {
      error : false,
      cookies: props,
      successful_login: false,
    }
    this.handleFormAuthenticationSubmit = this.handleFormAuthenticationSubmit.bind(this);
  }


  handleFormAuthenticationSubmit(email, password) {

    axios.get("http://localhost:3001/users/")
      .then(res => {
        let user_found= false;
        let i = 0
        while (!user_found && i < res.data.number_of_users) {
          // console.log(email + " " + res.data.user_list[i].email)
          // console.log(password + " " + res.data.user_list[i].password)
          user_found = email === res.data.user_list[i].email &&
            password === res.data.user_list[i].password;
          i++;
        }
        if(user_found) {
          i--;
          const { cookies } = this.state.cookies;
          const d = new Date();
          d.setTime(d.getTime() + (constants.ONE_HOUR));
          cookies.set('logged_in', res.data.user_list[i].id, {expires : d});

          const user_info = {
            id: res.data.user_list[i].id,
            first_name: res.data.user_list[i].first_name,
            last_name: res.data.user_list[i].last_name,
            accreditation_level: res.data.user_list[i].accreditation_level,
            photo: res.data.user_list[i].photo,
          }
          cookies.set('user_info', user_info ,{expires : d})
          
          this.setState ({
            successful_login: true,
          });
        } else {
          this.setState({
            error: true,
            successful_login: false,
          });
        }


    });
  }

  render() {
    //In case of successful login
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    // console.log("sucessful-login " + this.state.successful_login)
    if (this.state.successful_login === true) {
      return (<Redirect to={from.pathname} />);
    } else {
      //Otherwise
      return(
        <div className='login-form background_image'>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
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
}

export default withCookies(LoginPage)
