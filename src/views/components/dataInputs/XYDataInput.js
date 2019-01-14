import React, {Component} from "react";

import {connect} from "react-redux";

import {
    addPoint,
    removePoint,
    editPoint
} from "../../../state/actions/points/pointsActions";


import {
    setXLabel,
    setYLabel
} from "../../../state/actions/selections/selectionsActions";

import uuid from "uuid";

import $ from "jquery";

import "./XYDataInput.css";

class XYDataInput extends Component {
    constructor(props) {
        super(props);

        this.xInputRef = React.createRef();
        this.yInputRef = React.createRef();


        this.state = {
            points: [],
            newX: "",
            newY: "",
            errorMessage: "",
            editMode: [],
            type: "Punktowy",
            xEditMode: false,
            yEditMode: false
        };
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

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

            let xValues = Object.values(this.props.points.points).filter(point => {
                return point.x === newPoint.x;
            })

            if (Object.values(xValues).length > 0) {
                this.setState({
                    errorMessage: "Taka wartość X już istnieje"
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
        return (
            <div>
                <h4>
                    <strong>Dane:</strong>
                </h4>
                <div className="list" id="listDiv">
                    <table className="table">
                        <thead>
                        <tr>
                            {this.state.xEditMode === true ?
                                <th className="valueWidth"><input ref={this.xInputRef} className="inputField"
                                                                  autoFocus={true}
                                                                  defaultValue={this.props.selections.xLabel}
                                                                  onBlur={() => {

                                                                      this.props.setXLabel(this.xInputRef.current.value);


                                                                      this.setState({
                                                                          xEditMode: false
                                                                      })
                                                                  }
                                                                  }
                                /></th>
                                :
                                <th className="valueWidth"
                                    onClick={() => {
                                        this.setState({
                                            xEditMode: true
                                        })
                                    }
                                    }
                                >{this.props.selections.xLabel}</th>
                            }
                            {this.state.yEditMode === true ?
                                <th className="valueWidth"><input ref={this.yInputRef} className="inputField"
                                                                  autoFocus={true}
                                                                  defaultValue={this.props.selections.yLabel}
                                                                  onBlur={() => {

                                                                      this.props.setYLabel(this.yInputRef.current.value);


                                                                      this.setState({
                                                                          yEditMode: false
                                                                      })
                                                                  }
                                                                  }
                                /></th>
                                :
                                <th className="valueWidth"
                                    onClick={() => {
                                        this.setState({
                                            yEditMode: true
                                        })
                                    }
                                    }
                                >{this.props.selections.yLabel}</th>
                            }
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
                        <th/>
                        <th/>
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
                    {this.props.selections.helpVisible &&
                    <tr>
                        <td colSpan="3">
                            <span className="text-muted">Przy tej wybranej rodzinie wykresów obie wprowadzane wartości muszą być wartościami numerycznymi</span>
                        </td>
                    </tr>
                    }
                    </tbody>
                </table>
                <h6 className="text-danger"> {this.state.errorMessage} </h6>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    points: state.XandYPoints.points,
    selections: state.Selections.selections
});

export default connect(
    mapStateToProps,
    {
        addPoint,
        removePoint,
        editPoint,
        setXLabel,
        setYLabel
    }
)(XYDataInput);
