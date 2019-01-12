import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './views/components/Header';

import MainPage from "./views/pages/MainPage"

export default class Routes extends Component {


  render() {
    return (
      <div className="Routes">
        <React.Fragment>
          <Router>
            <div className="app">
              <Header/>
              <Switch>
                <Route component={MainPage}/>
              </Switch>
            </div>
            </Router>  
        </React.Fragment>        
      </div>
    )
  }


}
