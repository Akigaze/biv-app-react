import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {TabContent, TabPane, Button} from "reactstrap";
import {VIEW_IDS} from "../constant/views";


const {search, upload, statistics} = VIEW_IDS;
export class ContentView extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {activeView} = this.props;

    return (
      <div>
        <TabContent activeTab={activeView}>
          <TabPane tabId={upload}>
            <h1>hello world</h1>
          </TabPane>
          <TabPane tabId={search}>
            <h1>Nice to Meet you</h1>
          </TabPane>
          <TabPane tabId={statistics}>
            <h1>statistics Result</h1>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    activeView: state.app.currentView
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentView)