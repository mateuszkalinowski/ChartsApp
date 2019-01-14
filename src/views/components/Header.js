import React, {Component} from "react";
import {CSVLink} from "react-csv";
import {connect} from "react-redux";
import CSVReader from 'react-csv-reader'

import {
    addPoint as addXYPoint,
    removeAllXYPoints
} from "../../state/actions/points/pointsActions";

import {
    addPoint as addNameValuePoint,
    removeAllNameAndValuePoints
} from "../../state/actions/nameAndValuePoints/nameAndValuePointsActions";

import {
    setXLabel,
    setYLabel,
    setNameLabel,
    setValueLabel,
    setHelpVisible
} from "../../state/actions/selections/selectionsActions";
import uuid from "uuid";

class Header extends Component {


    csvXYFileAdded = (data) => {

        this.props.removeAllXYPoints();

        data.forEach(function (item, index) {
            if (index !== 0) {

                const newPoint = {
                    id: uuid(),
                    x: item[0],
                    y: item[1]
                };

                if (!isNaN(newPoint.x) && !isNaN(newPoint.y)) {
                    this.props.addXYPoint(newPoint);
                }
            } else {
                this.props.setXLabel(item[0]);
                this.props.setYLabel(item[1]);
            }
        }.bind(this));
    };

    csvNameValueFileAdded = (data) => {

        this.props.removeAllNameAndValuePoints();

        data.forEach(function (item, index) {
            if (index !== 0) {

                const newPoint = {
                    id: uuid(),
                    name: item[0],
                    value: item[1]
                };

                if (!isNaN(newPoint.value)) {
                    this.props.addNameValuePoint(newPoint);
                }
            } else {
                this.props.setNameLabel(item[0]);
                this.props.setValueLabel(item[1]);
            }
        }.bind(this));

    }

    render() {
        let csvXYData = [];
        this.props.xypoints.points.forEach(point => {
            csvXYData.push({
                [this.props.selections.xLabel]: point.x,
                [this.props.selections.yLabel]: point.y
            });
        });
        let csvNameValueData = [];
        this.props.nvpoints.points.forEach(point => {
            csvNameValueData.push({
                [this.props.selections.nameLabel]: point.name,
                [this.props.selections.valueLabel]: point.value
            });
        });


        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            ChartsApp
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink"
                                       role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Plik
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <CSVLink data={csvXYData} filename={"numericData.csv"}
                                                 className="dropdown-item text-dark">Pobierz dane liczbowe jako plik
                                            CSV</CSVLink>
                                        <CSVLink data={csvNameValueData} filename={"textData.csv"}
                                                 className="dropdown-item text-dark">Pobierz dane tekstowe jako plik
                                            CSV</CSVLink>
                                        <div className="dropdown-divider"></div>
                                        <CSVReader
                                            cssClass="csv-reader-input dropdown-item text-dark"
                                            label="Dodaj dane liczbowe z pliku CSV"
                                            onFileLoaded={this.csvXYFileAdded}
                                            onError={this.handleDarkSideForce}
                                            inputId="csvNewData"
                                            inputStyle={{color: 'black'}}
                                        />
                                        <CSVReader
                                            cssClass="csv-reader-input dropdown-item text-dark"
                                            label="Dodaj dane tekstowe z pliku CSV"
                                            onFileLoaded={this.csvNameValueFileAdded}
                                            onError={this.handleDarkSideForce}
                                            inputId="csvNewData"
                                            inputStyle={{color: 'black'}}
                                        />
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" href="#" id="editNavbarMenuLink"
                                       role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Edycja
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="editNavbarMenuLink">
                                        <a className="dropdown-item" href="#"
                                           onClick={() => {
                                               this.props.removeAllXYPoints();
                                           }}
                                        >Usuń wszystkie dane liczbowe</a>
                                        <a className="dropdown-item" href="#"
                                           onClick={() => {
                                               this.props.removeAllNameAndValuePoints();
                                           }}
                                        >Usuń wszystkie dane tekstowe</a>
                                    </div>
                                </li>
                                {this.props.selections.helpVisible === false &&
                                <li className="nav-item active">
                                <a className="nav-link" href="#"
                                onClick={() => {
                                this.props.setHelpVisible(true);
                                }
                                }
                                >
                                    Pokaż pomoc
                                </a>
                                </li>
                                }
                                {this.props.selections.helpVisible === true &&
                                <li className="nav-item active">
                                    <a className="nav-link" href="#"
                                    onClick={() => {
                                    this.props.setHelpVisible(false);
                                    }
                                    }
                                    >
                                        Ukryj pomoc
                                    </a>
                                </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    xypoints: state.XandYPoints.points,
    nvpoints: state.NameAndValuePoints.points,
    selections: state.Selections.selections

});


export default connect(mapStateToProps, {
    addXYPoint,
    addNameValuePoint,
    removeAllXYPoints,
    removeAllNameAndValuePoints,
    setXLabel,
    setYLabel,
    setNameLabel,
    setValueLabel,
    setHelpVisible
})(Header);