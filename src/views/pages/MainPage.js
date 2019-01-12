import React, {Component} from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
    addPoint,
    removePoint,
    editPoint
} from "../../state/actions/points/pointsActions";

import XYDataInput from "../components/dataInputs/XYDataInput";
import NameAndValueDataInput from "../components/dataInputs/NameAndValueDataInput";

import PointsChart from "../components/charts/PointsChart";
import LinesChart from "../components/charts/LinesChart";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import VerticalBarChart from "../components/charts/VerticalBarChart";


class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            XandYPoints: [],
            NumbersChartType: "Punktowy",
            TextChartType: "KolumnowyHoryzontalny",
            family: "Liczbowe"
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-2">
                    <div className="col-sm-12 center">
                        <h3>Wybór rodziny wykresów:</h3>
                        <button
                            className="btn btn-dark mx-4"
                            onClick={() => {
                                this.setState({
                                    family: "Liczbowe"
                                });
                            }}
                        >Liczbowe
                        </button>
                        <button
                            className="btn btn-dark mx-4"
                            onClick={() => {
                                this.setState({
                                    family: "Tekstowe"
                                });
                            }}
                        >Tekstowe
                        </button>
                    </div>
                </div>
                <div className="row">
                    {this.state.family === "Liczbowe" &&
                    <div className="col-sm-4">
                        <XYDataInput/>
                    </div>
                    }
                    {this.state.family === "Tekstowe" &&
                    <div className="col-sm-4">
                        <NameAndValueDataInput/>
                    </div>
                    }

                    <div className="col-sm-8">
                        <h4>
                            <strong>Wykres:</strong>
                        </h4>
                        {this.state.family === "Liczbowe" &&
                        <React.Fragment>
                            {
                                this.state.NumbersChartType === "Punktowy" && (
                                    <PointsChart points={this.props.xypoints}/>
                                )
                            }
                            {this.state.NumbersChartType === "Liniowy" && (
                                    <LinesChart points={this.props.xypoints}/>
                            )
                            }
                            <button
                                className="btn btn-dark mx-4"
                                onClick={() => {
                                    this.setState({
                                        NumbersChartType: "Punktowy"
                                    });
                                }}
                            >
                                Punktowy
                            </button>
                            <button
                                className="btn btn-dark mx-4"
                                onClick={() => {
                                    this.setState({
                                        NumbersChartType: "Liniowy"
                                    });
                                }}
                            >
                                Liniowy
                            </button>
                        </React.Fragment>
                        }

                        {this.state.family === "Tekstowe" &&
                        <React.Fragment>
                            {
                                this.state.TextChartType === "KolumnowyHoryzontalny" && (
                                    <HorizontalBarChart points={this.props.nvpoints}/>
                                )
                            }
                            {
                                this.state.TextChartType === "KolumnowyWertykalny" && (
                                    <VerticalBarChart points={this.props.nvpoints}/>
                                )
                            }
                            <button
                                className="btn btn-dark mx-4"
                                onClick={() => {
                                    this.setState({
                                        TextChartType: "KolumnowyHoryzontalny"
                                    });
                                }}
                            >
                                Kolumnowy Horyzontalny
                            </button>
                            <button
                                className="btn btn-dark mx-4"
                                onClick={() => {
                                    this.setState({
                                        TextChartType: "KolumnowyWertykalny"
                                    });
                                }}
                            >
                                Kolumnowy Wertykalny
                            </button>
                        </React.Fragment>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    xypoints: state.XandYPoints.points,
    nvpoints: state.NameAndValueReducer.points

});

export default connect(
    mapStateToProps,
    {
        addPoint,
        removePoint,
        editPoint
    }
)(MainPage);
