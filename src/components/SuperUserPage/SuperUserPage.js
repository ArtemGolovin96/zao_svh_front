import React, { Component } from "react";
import "./SuperUserPage.css";
import store from "../../redux/store";
import { connect } from "react-redux";
import axios from 'axios'

import {
  loginInputFromAdminPageAddAction,
  passwInputFromAdminPageAddAction,
  loginInputFromAdminPageDeleteAction,
  passwInputFromAdminPageDeleteAction,
} from '../../redux/action'
// ./img/LoginPage_img/logo_login_page.svg
// file:///C:/Users/User/Desktop/final_solo_prj_zao_sovhoz_lenina_/frontend/img/LoginPage_img/k.jpg
class SuperUser extends Component {


  getOnSubmitAdd = (data) => {
    const axiosOptions =  {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      data: data
    }
    axios.post("http://localhost:7778/admin", axiosOptions)
    .then((res) => {
      console.log(res)
    })
  }

  getOnSubmitDelete = (data) => {
    const axiosOptions =  {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      data: data
    }
    axios.post("http://localhost:7778/admin", axiosOptions)
    .then((res) => {
      console.log(res)
    })
  }


  onSubmitAdd = (e) => {
    e.preventDefault();
    const dataFromForm = new FormData(e.target);
    const data = [...dataFromForm.values()];
    const user = {login: data[0], pass: data[1]}
    if(this.validateLogin(user.login)) {
      this.getOnSubmitAdd(user);
    } else {
      alert ("Неправильный формат логина. Необходимый формат ----->   username@departament")
    }
  }

  onSubmitDelete = (e) => {
    e.preventDefault();
    const dataFromForm = new FormData(e.target);
    const data = [...dataFromForm.values()];
    const user = {login: data[0], pass: data[1]};
    if(this.validateLogin(user.login)) {
      this.getOnSubmitDelete(user);
    } else {
      alert ("Неправильный формат логина. Необходимый формат ----->   username@departament")
    }
    
  }

  
  validateLogin = (login)=> {
    const reg = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)$/;
    console.log(reg.test(login), "----- валидация");
    return (reg.test(login));
}



  render() {
    return (
      <main className="super-user">
        <h1 className="admins-page-h1">Страница администратора</h1>
        <section className="forms">
          <form className="admins-form-add" onSubmit={this.onSubmitAdd}>
            <h2 className="form-name-admin">Добавить сотрудника</h2>
            <p className="add-login-p">Добавить логин</p>
            <input className="login-input-admin" type="text" placeholder="имя@отдел" onChange={(e) => this.props.loginInputFromAdminPageAddActionProps(e)} name="loginAdd"></input>
            <p className="add-pass-p">Добавить логин</p>
            <input className="pass-input-admin" type="text" placeholder="Придумайте пароль" onChange={(e) => this.props.passwInputFromAdminPageAddActionProps(e)} name="passAdd"></input>
            <button className="add-admin-button" type="submit">Добавить сотрудника</button>
          </form>
          <hr></hr>
          <form className="admins-form-delete" onSubmit={this.onSubmitDelete}>
            <h2 className="form-name-admin">Удалить сотрудника</h2>
            <p className="delete-login-p">Логин</p>
            <input className="login-input-admin" type="text" placeholder="имя@отдел" onChange={(e) => this.props.loginInputFromAdminPageDeleteActionProps(e)} name="loginDel"></input>
            <p className="delete-pass-p">Пароль</p>
            <input className="pass-input-admin" type="text" placeholder="Введите пароль" onChange={(e) => this.props.passwInputFromAdminPageDeleteActionrops(e)} name="passDel"></input>
            <button className="delete-admin-button" type="submit">Удалить сотрудника</button>
          </form>
        </section>
      </main>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    loginInputFromAdminPageAddActionProps: (e) => { dispatch(loginInputFromAdminPageAddAction(e.target.value)) },
    passwInputFromAdminPageAddActionProps: (e) => { dispatch(passwInputFromAdminPageAddAction(e.target.value)) },
    loginInputFromAdminPageDeleteActionProps: (e) => { dispatch(loginInputFromAdminPageDeleteAction(e.target.value)) },
    passwInputFromAdminPageDeleteActionrops: (e) => { dispatch(passwInputFromAdminPageDeleteAction(e.target.value)) },
  }
}


export default connect(() => { }, mapDispatchToProps)(SuperUser)