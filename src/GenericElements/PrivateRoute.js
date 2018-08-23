import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


class PrivateRoute extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      logged_in: cookies.get('logged_in'),
      cookies: cookies,
    };
  }

  render() {
     const {component: Component, ...rest} = this.props;
     const renderRoute = props => {
       if (this.state.cookies.get('logged_in')) {
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
