import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import LoginPage from './LoginPage/LoginPage';
import Game from "./TicTacToe"
import NewConsultation from "./NewConsultation/NewConsultation"
import ConsultationList from "./ConsultationList/ConsultationList"
import ConsultationDetail from "./ConsultationDetail/ConsultationDetail"
import PrivateRoute from "./GenericElements/PrivateRoute"
import Test from "./test"

import './App.css';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    // cookies.set('name', "Harry", { path: '/' });
    // cookies.set('age', 16, { path: '/' });
    // cookies.set('height', 185, { path: '/' });

    // const d = new Date();
    // d.setTime(d.getTime() + (5000));
    // cookies.set('expire', "value", {expires : d})
    // console.log(cookies.getAll('name'))
    //
    //
    // setTimeout(function () {
    //     console.log("Hello");
    //     console.log(cookies.getAll('name'))
    // }, 5010);
    //
    // console.log(cookies.getAll('name'))
  }



  render() {
    return (
      <CookiesProvider>
        <HashRouter>
            <div className="App content">
              <PrivateRoute exact path="/" component={ConsultationList}/>
              <Route exact path="/test" component={Test}/>
              <Route exact path="/login" component={LoginPage}/>
              <PrivateRoute exact path="/new_consultation" component={NewConsultation}/>
              <PrivateRoute exact path="/consultation_list" component={ConsultationList}/>
              <PrivateRoute exact path="/consultation_detail" component={ConsultationDetail}/>
              <PrivateRoute exact path="/TicTacToe" component={Game}/>
            </div>
        </HashRouter>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
