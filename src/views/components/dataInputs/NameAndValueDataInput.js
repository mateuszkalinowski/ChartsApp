import React, {Component} from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
    addPoint,
    removePoint,
    editPoint
} from "../../../state/actions/nameAndValuePoints/nameAndValuePointsActions";

import {
    setNameLabel,
    setValueLabel
} from "../../../state/actions/selections/selectionsActions";

import uuid from "uuid";

import $ from "jquery";

import "./NameAndValueDataInput.css";
import {CSVLink} from "react-csv";

class NameAndValueDataInput extends Component {
    constructor(props) {
        super(props);

        this.nameInputRef = React.createRef();
        this.valueInputRef = React.createRef();

        this.state = {
            points: [],
            newName: "",
            newValue: "",
            errorMessage: "",
            editMode: [],
            type: "Punktowy",
            nameEditMode: false,
            valueEditMode: false
        };
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    addPoint = () => {
        const newRecord = {
            id: uuid(),
            name: this.state.newName,
            value: this.state.newValue
        };

        if (newRecord.name !== "" && newRecord.value !== "") {
            if (isNaN(newRecord.value)) {
                this.setState({
                    errorMessage: "Wartość Y nie jest liczbą"
                });
                return;
            }

            let xValues = Object.values(this.props.points.points).filter(point => {
                return point.x === newRecord.x;
            });


            this.props.addPoint(newRecord);
            this.setState({
                errorMessage: "",
                newName: "",
                newValue: ""
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
        let newName = $("#x_" + id).val();
        let newValue = $("#y_" + id).val();

        let edit = true;

        if (newName === "" || newValue === "") {
            this.setState({
                errorMessage:
                    "Nie można było zmienić wartości, ponieważ nowa wartość jest pusta"
            });
            edit = false;
        }
        if (isNaN(newValue)) {
            this.setState({
                errorMessage:
                    "Nie można było zmienić wartości. Nowa wartość Y musi być liczbą"
            });
            edit = false;
        }

        if (edit) this.props.editPoint(id, newName, newValue);

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
                            {this.state.nameEditMode === true ?
                                <th className="valueWidth"><input ref={this.nameInputRef} className="inputField"
                                                                  autoFocus={true}
                                                                  defaultValue={this.props.selections.nameLabel}
                                                                  onBlur={() => {

                                                                      this.props.setNameLabel(this.nameInputRef.current.value);


                                                                      this.setState({
                                                                          nameEditMode: false
                                                                      })
                                                                  }
                                                                  }
                                /></th>
                                :
                                <th className="valueWidth"
                                    onClick={() => {
                                        this.setState({
                                            nameEditMode: true
                                        })
                                    }
                                    }
                                >{this.props.selections.nameLabel}</th>
                            }
                            {this.state.valueEditMode === true ?
                                <th className="valueWidth"><input ref={this.valueInputRef} className="inputField"
                                                                  autoFocus={true}
                                                                  defaultValue={this.props.selections.valueLabel}
                                                                  onBlur={() => {

                                                                      this.props.setValueLabel(this.valueInputRef.current.value);


                                                                      this.setState({
                                                                          valueEditMode: false
                                                                      })
                                                                  }
                                                                  }
                                /></th>
                                :
                                <th className="valueWidth"
                                    onClick={() => {
                                        this.setState({
                                            valueEditMode: true
                                        })
                                    }
                                    }
                                >{this.props.selections.valueLabel}</th>
                            }
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.values(this.props.points.points).map(point => (
                            <tr key={uuid()}>
                                {!this.state.editMode.includes(point.id) && (
                                    <React.Fragment>
                                        <td className="valueWidth">{point.name}</td>
                                        <td className="valueWidth">{point.value}</td>
                                    </React.Fragment>
                                )}
                                {this.state.editMode.includes(point.id) && (
                                    <React.Fragment>
                                        <td className="valueWidth">
                                            <input
                                                className="newValueInput text-center"
                                                defaultValue={point.name}
                                                id={"x_" + point.id}
                                            />
                                        </td>
                                        <td className="valueWidth">
                                            <input
                                                className="newValueInput text-center"
                                                defaultValue={point.value}
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
                                className="form-input text-center newNameInput"
                                name="newName"
                                id="newName"
                                value={this.state.newName}
                                onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <input
                                className="form-input text-center newValueInput"
                                name="newValue"
                                id="newValue"
                                value={this.state.newValue}
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
                            <span className="text-muted">Przy tej wybranej rodzinie wykresów pierwsza wartość może być dowolnym słowem (kategoria),
                            a druga wartością numeryczną</span>
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
    points: state.NameAndValuePoints.points,
    selections: state.Selections.selections
});

export default connect(
    mapStateToProps,
    {
        addPoint,
        removePoint,
        editPoint,
        setNameLabel,
        setValueLabel
    }
)(NameAndValueDataInput);
