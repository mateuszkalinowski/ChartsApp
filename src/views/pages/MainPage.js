import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  addPoint,
  removePoint,
  editPoint
} from "../../state/actions/points/pointsActions";

import uuid from "uuid";

import $ from "jquery";

import "./MainPage.css";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  PieChart,
  Pie
} from "recharts";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [],
      newX: "",
      newY: "",
      errorMessage: "",
      editMode: [],
      type: "Punktowy"
    };
  }

  componentDidMount() {}

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  addPoint = () => {
    const newPoint = {
      id: uuid(),
      x: this.state.newX,
      y: this.state.newY
    };

    if (newPoint.x !== "" && newPoint.y !== "") {
      if (isNaN(newPoint.x)) {
        this.setState({
          errorMessage: "Wartość X nie jest liczbą"
        });
        return;
      }

      if (isNaN(newPoint.y)) {
        this.setState({
          errorMessage: "Wartość Y nie jest liczbą"
        });
        return;
      }

      this.props.addPoint(newPoint);
      this.setState({
        errorMessage: "",
        newX: "",
        newY: ""
      });

      $("#listDiv").scrollTop($("#listDiv")[0].scrollHeight);
    } else {
      this.setState({
        errorMessage: "Obie wartości muszą być wypełnione"
      });
    }
  };

  removePoint(id) {
    this.props.removePoint(id);
  }

  editModeTurnOn(id) {
    let editMode = this.state.editMode;
    editMode.push(id);
    this.setState({
      editMode: editMode
    });
  }

  editModeTurnOff(id) {
    let newX = $("#x_" + id).val();
    let newY = $("#y_" + id).val();

    let edit = true;

    if (newX === "" || newY === "") {
      this.setState({
        errorMessage:
          "Nie można było zmienić wartości, ponieważ nowa wartość jest pusta"
      });
      edit = false;
    }
    if (isNaN(newX) || isNaN(newY)) {
      this.setState({
        errorMessage:
          "Nie można było zmienić wartości. Obie nowe wartości musza być liczbami"
      });
      edit = false;
    }

    if (edit) this.props.editPoint(id, newX, newY);

    let editMode = this.state.editMode;

    editMode = editMode.filter(data => {
      return data !== id;
    });
    this.setState({
      editMode: editMode
    });
  }

  render() {
    let data = [];

    this.props.points.points.forEach(point => {
      data.push({
        x: point.x,
        y: point.y
      });
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h4>
              <strong>Dane:</strong>
            </h4>
            <div className="list" id="listDiv">
              <table className="table">
                <thead>
                  <tr>
                    <th className="valueWidth">X</th>
                    <th className="valueWidth">Y</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(this.props.points.points).map(point => (
                    <tr key={uuid()}>
                      {!this.state.editMode.includes(point.id) && (
                        <React.Fragment>
                          <td className="valueWidth">{point.x}</td>
                          <td className="valueWidth">{point.y}</td>
                        </React.Fragment>
                      )}
                      {this.state.editMode.includes(point.id) && (
                        <React.Fragment>
                          <td className="valueWidth">
                            <input
                              className="newValueInput text-center"
                              defaultValue={point.x}
                              id={"x_" + point.id}
                            />
                          </td>
                          <td className="valueWidth">
                            <input
                              className="newValueInput text-center"
                              defaultValue={point.y}
                              id={"y_" + point.id}
                            />
                          </td>
                        </React.Fragment>
                      )}
                      <td className="buttonsWidth">
                        {this.state.editMode.includes(point.id) ? (
                          <button
                            className="btn btn-success btn-small tableButton mx-3"
                            onClick={() => {
                              this.editModeTurnOff(point.id);
                            }}
                          >
                            Zapisz
                          </button>
                        ) : (
                          <button
                            className="btn btn-success btn-small tableButton mx-3"
                            onClick={() => {
                              this.editModeTurnOn(point.id);
                            }}
                          >
                            Edytuj
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-small tableButton mx-3"
                          onClick={() => {
                            this.removePoint(point.id);
                          }}
                        >
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      className="form-input text-center newValueInput"
                      name="newX"
                      id="newX"
                      value={this.state.newX}
                      onChange={this.onChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-input text-center newValueInput"
                      name="newY"
                      id="newY"
                      value={this.state.newY}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <button
                      className="btn btn-primary btn-block btn-sm"
                      onClick={this.addPoint}
                    >
                      Dodaj
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h6 className="text-danger"> {this.state.errorMessage} </h6>
          </div>
          <div className="col-sm-8">
            <h4>
              <strong>Wykres:</strong>
            </h4>
            {this.state.type === "Punktowy" && (
              <ScatterChart
                width={760}
                height={500}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="x" />
                <YAxis type="number" dataKey="y" name="y" />

                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter
                  name="Dane"
                  data={this.props.points.points}
                  fill="#8884d8"
                />
              </ScatterChart>
            )}
            {this.state.type === "Liniowy" && (
              <LineChart
                width={760}
                height={500}
                data={data}
                margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
              </LineChart>
            )}
            <button
              className="btn btn-info mx-4"
              onClick={() => {
                this.setState({
                  type: "Punktowy"
                });
              }}
            >
              Punktowy
            </button>
            <button
              className="btn btn-info mx-4"
              onClick={() => {
                this.setState({
                  type: "Liniowy"
                });
              }}
            >
              Liniowy
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  points: state.points.points
});

export default connect(
  mapStateToProps,
  {
    addPoint,
    removePoint,
    editPoint
  }
)(MainPage);
