import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import { CookiesProvider, withCookies } from 'react-cookie';

import LoginPage from './LoginPage/LoginPage';
import Game from "./TicTacToe"
import NewConsultation from "./NewConsultation/NewConsultation"
import ConsultationList from "./ConsultationList/ConsultationList"
import ConsultationDetail from "./ConsultationDetail/ConsultationDetail"
import PrivateRoute from "./GenericElements/PrivateRoute"
import Test from "./test"

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
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
