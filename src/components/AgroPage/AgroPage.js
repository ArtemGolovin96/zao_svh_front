import React, { Component } from 'react';
import './AgroPage.css';
import store from '../../redux/store';
import { connect } from 'react-redux';
import axios from 'axios'
import Space from './Space.js'

// import {

// } from '../../redux/action'

class AgroPage extends Component {


  render() {
    return (
      <main className="agronom-page">
          <header className="agro-page-header">
            <h1 className="agro-h1">Агроному место в поле!</h1>
          </header>
          <section className="main-section-sqr">
            <Space />

          </section>
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


export default connect(() => { }, mapDispatchToProps)(AgroPage)