import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import './App.css';
import LoginPage from './LoginPage';
import Game from "./TicTacToe"
import Dashboard from "./Dashboard/Dashboard"
import NewConsultation from "./NewConsultation/NewConsultation"
import ConsultationList from "./ConsultationList/ConsultationList"
import ConsultationDetail from "./ConsultationDetail/ConsultationDetail"
import Test from "./test"

class App extends Component {
  render() {
    return (
      <HashRouter>
          <div className="App content">
            <Route exact path="/" component={ConsultationList}/>
            <Route exact path="/test" component={Test}/>
            <Route exact path="/temp" component={LoginPage}/>
            <Route exact path="/new_consultation" component={NewConsultation}/>
            <Route exact path="/consultation_list" component={ConsultationList}/>
            <Route exact path="/consultation_detail" component={ConsultationDetail}/>
            <Route exact path="/TicTacToe" component={Game}/>
          </div>
      </HashRouter>
    );
  }
}

export default App;
