import React, { Component } from "react";
import compassImg from './compass.svg'
import "./AgroPage.css";
import store from "../../redux/store";
import { connect } from "react-redux";
import axios from "axios";
import VisualSpace from "./VisualSpace/VisualSpace";
import VisualSpaceOpened from "./VisualSpace/VisualSpaceOpened";
import { YMaps, Map, GeoObject, Rectangle, Button } from "react-yandex-maps";
import ButtonGroup from "antd/lib/button/button-group";
import { Link } from "react-router-dom";
import { takeArrOfSotsAction } from "../../redux/action";
// import { Button } from "antd";

// import {

// } from '../../redux/action'

class Space extends Component {
  state = {
    open: false,
    arrOfSpacesFromBack: [],
    clickedSpaceOpened: "",
    sortsArr: [],
    arrOfAllSorts: [],
    showMap: false,
    buttonOnMapType: "Гибрид",
    typeOfMap: "yandex#publicMapHybrid",
  };

  onClickSpaceOpen = (e, el) => {
    this.setState({ open: true });
    const res = this.state.arrOfSpacesFromBack.find(
      (item) => el._id === item._id
    );
    this.setState({ clickedSpaceOpened: res });
    this.setState({ sortsArr: res.sortsOnSquare });
  };

  componentDidMount() {
    this.getSpaces();
    this.getSpacesSorts();
  }

  getSpacesSorts = () => {
    axios
      .get("https://klubnikolov-api.herokuapp.com/agro/sorts")
      .then((response) => {
        const arr = [...response.data];
        this.setState({ arrOfAllSorts: arr });
        this.props.takeArrOfSotsActionProps(arr);
      })
      .catch(function (error) {
        alert("Ошибка загрузки страницы. Обратитесь к администратору");
      });
  };

  getSpaces = () => {
    axios
      .get("https://klubnikolov-api.herokuapp.com/agro")
      .then((response) => {
        const arr = [...response.data];
        this.setState({ arrOfSpacesFromBack: arr });
        console.log(arr, '------')
      })
      .catch(function (error) {
        alert("Ошибка загрузки страницы. Обратитесь к администратору");
      });
  };

  onClickTypeMap = (prevState) => {
    if (this.state.typeOfMap === "yandex#publicMapHybrid") {
      this.setState({ typeOfMap: "yandex#map" });
      return Object.assign({}, prevState, { type: "yandex#map" });
    } else {
      this.setState({ typeOfMap: "yandex#publicMapHybrid" });
      return Object.assign({}, prevState, { type: "yandex#publicMapHybrid" });
    }
  };

  onClickShoWMap = () => {
    if (this.state.showMap === false) {
      this.setState({ showMap: true });
    } else {
      this.setState({ showMap: false });
    }
  };

  gettingЕheAverage = () => {
    let res = this.state.arrOfAllSorts.reduce((acc, item) => {
      if (
        this.state.sortsArr.some((name) => name.name === item.name)
      ) {
        console.log(this.state.sortsArr.length, "<-----------");
        let res = acc + item.yieldbush;
        return res;
      } else {
        return acc;
      }
    }, 0)
    let average = (res / this.state.sortsArr.length) * 5;
    return (average)
  }

  allYeldFromSpace = () => {
    const metersGektars = 10000;
    const allArea = this.state.clickedSpaceOpened.spaceAreaAll;
    let metersSpace = allArea * metersGektars;
    let average = this.gettingЕheAverage();
    let result = metersSpace * average;
    let tons = result * 0.001;
    return tons
  }

  



  render() {
    return (
      <main className="space-page">
        <div className="space-container">
          <h2 className="space-container-name">Название полей</h2>
          {this.state.arrOfSpacesFromBack.map((el) => {
            // console.log(this.state.arrOfSpacesFromBack)
            return (
              <section
                className="space"
                onClick={(e) => this.onClickSpaceOpen(e, el)}
              >
                <div className="container-name-space">
                  <p className="name-space">{el.spaceName}</p>
                  <p className="name-brigade"> {el.spaceBrigade}</p>
                </div>
              </section>
            );
          })}
          <section className="add-space-button-section">
            <Link className="add-space-button-link" to="agro-calc">
              <button className="add-space-button">Добавить новое поле</button>
            </Link>
          </section>
        </div>
        <div className={this.state.open ? "space-opened" : "space-closed"}>
          <div className="container-name-space-opened">
            <p className="name-space">
              {this.state.clickedSpaceOpened.spaceName}
            </p>
            <p className="name-brigade">
              {" "}
              Бригада № {this.state.clickedSpaceOpened.spaceBrigade}
            </p>
          </div>
          <div className="container-space-information">
            <p className="start-space">Начало использования поля - 2018 год</p>
            <p className="all-gek-space-p">Площадь поля - {this.state.clickedSpaceOpened.spaceAreaAll} {" "} гектар</p>
            <p className="all-yield-p">Всего урожая сс поля - {
                this.allYeldFromSpace()
            } {" "} тонн </p>
            <p className="start-space">
              Средняя планируемая урожайность с одного метра грядки - {" "}
              {
                this. gettingЕheAverage()
              }{" "}
              кг
            </p>
            <p className="start-space">
              Средняя планируемая урожайность с одного куста -
              {/* Я знаю про О большое. Это для MVP */}
              {this.state.arrOfAllSorts.reduce((acc, item) => {
                if (
                  this.state.sortsArr.some((name) => name.name === item.name)
                ) {

                  return acc + item.yieldbush / this.state.sortsArr.length;
                } else {
                  return acc;
                }
              }, 0)}
              кг
            </p>
            <ul className="space-sorts">
              Сорта ягоды в поле:{"  "}
              {this.state.sortsArr.map((el, index) => {
                if (index !== this.state.sortsArr.length - 1) {
                  return " " + el.name + ", ";
                } else {
                  return " " + el.name + " ";
                }
              })}
            </ul>
          </div>
          <div className="container-space-opened-visual">
            <div className="visual-space">
              <img className="compass" src={compassImg}></img>
              <VisualSpaceOpened arg={this.state.clickedSpaceOpened} />
            </div>
            <div className="visual-space-information">
              <div className="space-information">
                <h4 className="space-information-mini">Расположение поля</h4>
                <button
                  className="show-map-button"
                  onClick={this.onClickShoWMap}
                >
                  {this.state.showMap
                    ? "Скрыть карту"
                    : "Показать расположение на карте"}
                </button>
                <div className="map-container">
                  {this.state.showMap? 
                  <YMaps >
                    <Map
                    instanceRef    
                      defaultState={{
                        center: [55.57, 37.71],
                        zoom: 10,
                        type: this.state.typeOfMap,
                      }}
                      width="100%"
                      height="100%"
                    >
                      <Button
                        data={{ content: this.state.buttonOnMapType }}
                        options={{ maxWidth: [28, 150, 178] }}
                        onClick={() => this.onClickTypeMap(this.state)}
                      />
                      <GeoObject
                        geometry={{
                          type: "Point",
                          coordinates: [55.57836893130973, 37.719111442565925],
                        }}
                        properties={{
                          iconContent: "Я тащусь",
                          hintContent: "Ну давай уже тащи",
                        }}
                        options={{
                          preset: "islands#blackStretchyIcon",
                          draggable: false,
                        }}
                      />
                    </Map>
                  </YMaps> : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    takeArrOfSotsActionProps: (e) => {
      dispatch(takeArrOfSotsAction(e));
    },
  };
};

export default connect(() => {}, mapDispatchToProps)(Space);
