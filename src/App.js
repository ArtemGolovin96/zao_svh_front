import React, { Component } from 'react';
import store from './redux/store';
import { Route } from 'react-router-dom';
import { Provider } from "react-redux";
import Favicon from 'react-favicon';
import { Link } from "react-router-dom";


import LoginPage from './components/LoginPage/LoginPage';
import SuperUserPage from './components/SuperUserPage/SuperUserPage';
import AgroPage from './components/AgroPage/AgroPage';
import BrigadePage from './components/BrigadePage/BrigadePage';
import SkladPage from './components/SkladPage/SkladPage';
import RukovodstvoPage from './components/RukovodstvoPage/RukovodstvoPage';
import AgroPageSpaceCalc from './components/AgroPage/AgroPageSpaceCalc';


import logo from './logo.svg';
import './App.css';




export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Favicon url={logo} />
          <title>{logo}</title>
          <Route path="/" exact component={LoginPage} />
          <Route path="/admin" exact component={SuperUserPage} />
          <Route path="/agro" exact component={AgroPage} />
          <Route path="/agro-calc" exact component={AgroPageSpaceCalc} />
          <Route path="/brigade" exact component={BrigadePage} />
          <Route path="/sklad" exact component={SkladPage} />
          <Route path="/ruk" exact component={RukovodstvoPage} />
        </div>
      </Provider>
    );
  }
}


