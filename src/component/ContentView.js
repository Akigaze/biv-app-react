import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {TabContent, TabPane, Button} from "reactstrap";
import {VIEW_IDS} from "../constant/views";


const {upload, empty} = VIEW_IDS;
export class ContentView extends Component{
  constructor(props){
    super(props)
  }

  render(){

    return (
      <div>
        <Button color="danger">Danger!</Button>
        {this.props.file}
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    file: state.upload.fileName
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentView)