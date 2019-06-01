import React, {Component} from "react";

import "./style/app.css";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import ContentView from "./component/ContentView";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.view}
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
