import React, { Component } from "react";
import "./VisualSpace.css";
import store from "../../../redux/store";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";
import { Row, Col, Divider } from "antd";

class VisualSpaceOpened extends Component {
  state = {
    rowsArrayState: [],
    columnsArrayState: [],
    sortsOnSector: [],

  };
  createdRows = () => {
    if (this.props.arg) {
      console.log(this.props.arg)
      const sortsArr = this.props.arg.sortsOnSquare;
      const rows = this.props.arg.volumeRowsOnSquare;
      const columns = this.props.arg.volumeColumnsOnSquare;
      let rowsArray = Array(rows)
        .fill()
        .map((e, i) => i + 1);
      let columnsArray = Array(columns)
        .fill()
        .map((e, i) => i + 1);
      this.setState({ rowsArrayState: rowsArray });
      this.setState({ columnsArrayState: columnsArray });
      this.setState({ sortsOnSector: sortsArr });
    }
  };

  componentDidMount() {
    this.createdRows();
  }

  render() {
    return (
      <div className="gen-space">
        <Divider></Divider>
        {
            this.state.rowsArrayState.map((el, inR) => {
              return (
                <Row className="row" id={inR + 1} key={inR + 1}>
                  {this.state.columnsArrayState.map((item, inC) => {
                    return (
                      <Col className="col" id={inC + 1} key={inC + 1}>
                        {
                        this.props.arg.sortsOnSquare.map((it) => {
                        console.log(it, '------------------------------------')
                        if (it.sector === inR + 1 + "." + (inC + 1)) {
                          return (
                            it.name +
                            "," +
                            " " +
                            it.gektars +
                            " " +
                            "гектаров" +
                            "," +
                            " " +
                            "Сектор " +
                            it.sector
                          );
                        }
                      })}
                      </Col>
                    );
                  })}
                </Row>
              );
            })  
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    options: state.globalArrOfSorts,
    volumeRowsOnSquare: state.volumeRowsOnSquare,
    volumeColumnsOnSquare: state.volumeColumnsOnSquare,
    sortEl: state.sortEl,
    sortsOnSquare: state.sortsOnSquare,
  };
};


export default connect(mapStateToProps, () => {})(VisualSpaceOpened);

