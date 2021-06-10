import React, { Component } from "react";
import "./LoginPage.css";
import store from "../../redux/store";
import { connect } from "react-redux";
import axios from 'axios'

import logo_login_page from "./logo_login_page.svg";
import { loginInputFromLoginPageAction, passwInputFromLoginPageAction } from '../../redux/action'

// ./img/LoginPage_img/logo_login_page.svg
// file:///C:/Users/User/Desktop/final_solo_prj_zao_sovhoz_lenina_/frontend/img/LoginPage_img/k.jpg
class LoginPage extends Component {

  state = {
    password: false
  }


  onClickPassword = (e) => {
    e.preventDefault();
    // this.props.match.params.id
    if(!this.state.password) {
      this.setState({ password: true })
    } else {
      this.setState({ password: false })
    } 
  }

  getOnSubmit = (data) => {
    const axiosOptions =  {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      data: data
    }
    axios.post("http://localhost:7778/", axiosOptions)
    .then((res) => {
      console.log(res)
      return res;
    })
    .then((response) => {
      console.log(data)
      this.props.history.push(`${response.data}`);
    })
    .catch(err => alert("Введен неправильный логин или пароль"))
  }

  onSubmit = (e) => {
    e.preventDefault();
    const dataFromForm = new FormData(e.target);
    const data = [...dataFromForm.values()];
    const user = {login: data[0], pass: data[1]}
    if(this.validateLogin(user.login)) {
      this.getOnSubmit(user);
    } else {
      alert("Вы ввели неправильный логин")
    }
  }


  validateLogin = (login)=> {
    const reg = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)$/;
    console.log(reg.test(login))
    return reg.test(login);
}

  render() {
    return (
      <main className="login-page">
        <header className="header-login-page"></header>

        <a href="https://sovhozlenina.ru/history/" target="blank">
          <img
            className="img-logo-login-page"
            src={logo_login_page}
            alt="ЗАО Совхоз имени Ленина"
          />
        </a>
        <form className="login-form" onSubmit={this.onSubmit}>
          <input
            className="login-input"
            name="login"
            maxLength="55"
            size="40"
            placeholder="Ваш пароль"
            onChange={(e) => this.props.loginInputFromLoginPageActionProps(e)}
          ></input>
          <div className="input-password-container">
            <input
              className="password-input"
              name="password"
              type={this.state.password? "test" : "password"}
              maxLength="25"
              size="40"
              placeholder="Ваш пароль"
              onChange={(e) => this.props.passwInputFromLoginPageActionProps(e)}
            ></input>
            <button className="pokazatbutton" onClick={this.onClickPassword}>👁‍🗨</button>
          </div>
          <button className="login-button" type="submit">ВОЙТИ</button>
        </form>

        <footer className="footer">
          <p className="p-footer-ok">
            Отдел кадров ЗАО "Совхоз имени Ленина" - +7(495) 548-66-70
          </p>
          <p className="p-footer-kontakti">Контакты</p>
          <p className="p-footer-prava">Все права защищены</p>
        </footer>
      </main>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    loginInputFromLoginPageActionProps: (e) => {dispatch(loginInputFromLoginPageAction(e.target.value))},
    passwInputFromLoginPageActionProps: (e) => {dispatch(passwInputFromLoginPageAction(e.target.value))}
  }
}


export default connect(()=>{}, mapDispatchToProps)(LoginPage)