import React, { Component } from "react";
import "./AgroPage.css";
import { connect } from "react-redux";
import store from "../../redux/store";
import axios from "axios";
import Select from "react-select";
import VisualSpace from "./VisualSpace/VisualSpace";
import {
  takeRowsForAntDAction,
  takeColumnsForAntDAction,
  selectedSortsAntdAction,
  selectedSortsAntdSectorAction,
} from "../../redux/action";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;


class AgroPageSpaceCalc extends Component {
  state = {
    sorts: [],
    sortsSelected: [],
    ventel: false,
    response: '',
  };

 

  propsFiles = {
    name: "file",
    multiple: true,
    action: "http://localhost:7778/agro-calc",
    info: '',
    onChange: (info) => {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setTimeout(() => {
          console.log(info)
        }, 200)
        message.success(`${info.file.name} file uploaded successfully.`);
        this.setState({response: info.file.response})
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    
  };




  //Таймауты
  timeOutIdRows = null;
  timeOutIdColumns = null;
  timeOutIdSelectedElGectar = null;
  timeOutIdSelectedElSector = null;



  componentDidMount() {
    this.getSpacesSorts();
  }

  getSpacesSorts = () => {
    axios
      .get("http://localhost:7778/agro-calc")
      .then((response) => {
        const arr = [...response.data];
        setTimeout(() => {
          console.log(this.state)
        }, 1000)
        this.setState({ sorts: arr });
        console.log(arr);
      })
      .catch(function (error) {
        alert("Ошибка загрузки страницы. Обратитесь к администратору");
      });
  };

  onChangeSelect = (e) => {
    this.setState({ sortsSelected: e });
    // this.setState({ ventel: true })
  };



  onChangeRows = (e) => {
    clearTimeout(this.timeOutId);
    this.timeOutIdRows = setTimeout(() => {
      this.props.takeRowsForAntDActionActionProps(e);
    }, 1000);
  };

  onChangeColumns = (e) => {
    clearTimeout(this.timeOutIdColumns);
    this.timeOutIdColumns = setTimeout(() => {
      this.props.takeColumnsForAntDActionActionProps(e);
    }, 1000);
  };

  onChangeSelectedElGectar = (e, label) => {
    clearTimeout(this.timeOutIdSelectedElGectar);
    this.timeOutIdSelectedElGectar = setTimeout(() => {
      this.props.selectedSortsAntdActionProps(e, label);
    }, 1000);
  };

  onChangeSelectedElSector = (e, el) => {
    clearTimeout(this.timeOutIdSelectedElSector);
    this.timeOutIdSelectedElSector = setTimeout(() => {
      this.props.selectedSortsAntdSectorActionProps(e, el);
    }, 1000);
  };

  submitHandler = (e) => {
    const formData = new FormData(e.target);
    const finalObjDataplusRedux = {
      spaceName: formData.get('name'),
      spaceBrigade: formData.get('brigade'),
      spaceAreaAll: +formData.get('area-all'),
      sortsOnSquare: this.props.sortsOnSquare,
      volumeRowsOnSquare: this.props.volumeRowsOnSquare.length,
      volumeColumnsOnSquare: this.props.volumeColumnsOnSquare.length,
      fileId: this.state.response 
    }
    
    this.axiosPOSTfinalDataObj(finalObjDataplusRedux)

  }

  axiosPOSTfinalDataObj = (obj) => {
    const option = {
      method: 'POST',
      headers: {'content-type': 'application/json' },
      data: JSON.stringify(obj),
      url: 'http://localhost:7778/agro-calc-obj',
    }
    axios(option).then((res) => console.log(res))
  }
  

  render() {
    return (
      <main className="agronom-space-calc">
        <header className="agro-space-calc-header">{/* //Some value */}</header>
        <div className="calc-container">
          <h3 className="name-calc">Создание   нового поля</h3>
          <form className="space-calc-form" onSubmit={this.submitHandler}>
            <div className="calc-name-brigade">
              <p className="input-name">Введите название поля - </p>
              <input
                className="space-calc-input-name"
                placeholder="Название поля"
                name="name"
              ></input>
              <p className="input-name">Выберите бригаду - </p>
              <select
                className="space-calc-input-name"
                placeholder="Название поля"
                name="brigade"
              >
                <option>Бригада № 1 Совхоз Ленина</option>
                <option>Бригада № 2 Молоково</option>
              </select>
            </div>
            <div className="calc-main">
              <div className="gektars-container-input">
              <p className="input-name">Введите площадь поля в гектарах</p>
              <input
                className="space-calc-input-name"
                placeholder="общая S в гектарах"
                name="area-all"
                type="number"
              ></input>
              </div>
              <div className="select-container">
              <p className="p-select-sorts">Выберите необходимые сорта</p>
              <Select
                onChange={(e) => this.onChangeSelect(e)}
                options={this.state.sorts}
                className="react-select"
                isMulti
                styles={{
                  option: (styles) => ({
                    backgroundColor: "#d53032",
                    color: "#ffd700",
                    border: "1px solid #ffd700",
                    borderRadius: "10px",
                    width: "130px",
                    margin: "10px auto",
                  }),
                }}
              />
              </div>
            </div>
            <div className="selected">
              {this.state.sortsSelected.map((el) => {
                return (
                  <div className="selected-input-container">
                    <p className="selected-name-sorts">{el.label}</p>
                    <input
                      name="selected-gekars-sort"
                      placeholder="введите количество гектар вашего сорта"
                      className="sorts-gertars-nput"
                      onChange={(e) =>
                        this.onChangeSelectedElGectar(e, el.label)
                      }
                    ></input>
                    <input
                      className="sorts-gertars-nput"
                      name="position-sort-gektars"
                      placeholder="Формат - 1.1"
                      onChange={(e) => this.onChangeSelectedElSector(e, el)}
                    ></input>
                  </div>
                );
              })}
            </div>
            <div className="visual-antd-continer">
              <VisualSpace />
              <div className="input-sectors-container">
                <p className="rows-p-input">
                  Введите количество секторов по горизонтали
                </p>
                <input
                  className="input-int-rows"
                  type="number"
                  onChange={this.onChangeRows}
                  nmae="space-rows"
                ></input>
                <p className="rows-p-input">
                  Введите количество секторов по вертикали
                </p>
                <input
                  className="input-int-columns"
                  type="number"
                  onChange={this.onChangeColumns}
                  name="space-columns"
                ></input>
              </div>

              <div className="files-data-container">
                {/* Только для MVP */}
                <Dragger className="dragger" {...this.propsFiles}>
                  <p className="ant-upload-text">
                    Перетащите нужный файл или кликните и сохраните
                  </p>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <div className="ant-upload-list ant-upload-list-texte"></div>
                </Dragger>
              </div>
            </div>
            <button className="save-space-button" type="submit">Сохранить поле</button>
          </form>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.globalArrOfSorts,
    sortsOnSquare: state.sortsOnSquare,
    volumeRowsOnSquare: state.volumeRowsOnSquare,
    volumeColumnsOnSquare: state.volumeColumnsOnSquare,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    takeRowsForAntDActionActionProps: (e) => {
      dispatch(takeRowsForAntDAction(e.target.value));
    },
    takeColumnsForAntDActionActionProps: (e) => {
      dispatch(takeColumnsForAntDAction(e.target.value));
    },
    selectedSortsAntdActionProps: (e, label) => {
      dispatch(selectedSortsAntdAction(e.target.value, label));
    },
    selectedSortsAntdSectorActionProps: (e, el) => {
      dispatch(selectedSortsAntdSectorAction(e.target.value, el));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgroPageSpaceCalc);
