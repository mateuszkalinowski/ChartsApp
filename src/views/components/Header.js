import React, {Component} from "react";
import {CSVLink} from "react-csv";
import {connect} from "react-redux";

import {
    removeAllXYPoints
} from "../../state/actions/points/pointsActions";

import {
    removeAllNameAndValuePoints
} from "../../state/actions/nameAndValuePoints/nameAndValuePointsActions";

class Header extends Component {
    render() {
        let csvData = [];
        if(this.props.selections.family === "Liczbowe") {
            this.props.xypoints.points.forEach(point => {
                csvData.push({
                    x: point.x,
                    y: point.y
                });
            });
        }
        if(this.props.selections.family === "Tekstowe") {
            this.props.nvpoints.points.forEach(point => {
                csvData.push({
                    name: point.name,
                    value: point.value
                });
            });
        }

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
                                        <a class="dropdown-item" href="#"><CSVLink data={csvData} filename={"data.csv"} className="text-dark">Pobierz dane jako plik CSV</CSVLink></a>
                                        {/*<a class="dropdown-item" href="#"></a>*/}
                                        {/*<a class="dropdown-item" href="#"></a>*/}
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

                                {/*<li class="nav-item active">*/}
                                {/*<a class="nav-link" href="#">*/}
                                {/*Wykresy danych liczbowych*/}
                                {/*</a>*/}
                                {/*</li>*/}
                                {/*<li class="nav-item active">*/}
                                {/*<a class="nav-link" href="#">*/}
                                {/*Wykresy danych tekstowych*/}
                                {/*</a>*/}
                                {/*</li> */}
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
    removeAllXYPoints,
    removeAllNameAndValuePoints
})(Header);