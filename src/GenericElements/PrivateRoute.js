import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


class PrivateRoute extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      logged_in: cookies.get('logged_in'),
    };
  }

  render() {
     const {component: Component, ...rest} = this.props;
     const renderRoute = props => {
         if (this.state.logged_in) {
            return (
                <Component {...props} />
            );
         }
         const to = {
             pathname: '/login',
             state: {from: props.location}
         };
         return (
             <Redirect to={to} />
         );
     }
     return (
         <Route {...rest} render={renderRoute}/>
     );
  }
}

export default withCookies(PrivateRoute);
