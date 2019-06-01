import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./style/app.css";
import ContentView from "./component/ContentView";
import NavigationBar from "./component/NavigationBar";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">BIO Info Visibility</h1>
        <NavigationBar/>
        <ContentView />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    view: state.app.currentView
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
