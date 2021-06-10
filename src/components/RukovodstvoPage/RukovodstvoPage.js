import React, { Component } from "react";
// import "./SuperUserPage.css";
import store from "../../redux/store";
import { connect } from "react-redux";
import axios from 'axios'

// import {

// } from '../../redux/action'

class RukovodstvoPage extends Component {

  render() {
    return (
      <main className="rukovodstvo-page">
          <h1>Страница руководства</h1>
      </main>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    // loginInputFromAdminPageAddActionProps: (e) => { dispatch(loginInputFromAdminPageAddAction(e.target.value)) },
    // passwInputFromAdminPageAddActionProps: (e) => { dispatch(passwInputFromAdminPageAddAction(e.target.value)) },
    // loginInputFromAdminPageDeleteActionProps: (e) => { dispatch(loginInputFromAdminPageDeleteAction(e.target.value)) },
    // passwInputFromAdminPageDeleteActionrops: (e) => { dispatch(passwInputFromAdminPageDeleteAction(e.target.value)) },
  }
}


export default connect(() => { }, mapDispatchToProps)(RukovodstvoPage)