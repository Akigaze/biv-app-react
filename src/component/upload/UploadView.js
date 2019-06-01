import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Button, CustomInput, Form, FormGroup, Label} from "reactstrap";

import "../../style/upload.css"
import {first} from "../../util/array-util";
import {OPERATION_TYPE} from "../../constant/upload";
import {BlankColumn} from "../common/blank";
import {uploadFileToServer} from "../../action/upload";

const {create, insert} = OPERATION_TYPE;
export class UploadView extends Component {
  constructor(props) {
    super(props);
    this.fileInout = React.createRef();
    this.state = {
      file: {},
      operationType: create
    }
  }

  fileSelect = (event) => {
    this.setState({file: first(this.fileInout.current.files)})
  };

  operationTypeSelect = (event) => {
    this.setState({operationType: event.target.value})
  };

  analysisBtnClick = (event) => {
    const {file, operationType} = this.state;
    this.props.actions.upload(file, operationType)
  };

  render() {
    const {file, operationType} = this.state;
    const fileLabel = file.name || "Choose a file";

    return (
      <div className="upload-view">
        <FormGroup>
          <Label for="file-upload">Select a upload file</Label>
          <CustomInput id="file-upload" type="file" innerRef={this.fileInout} label={fileLabel} onChange={this.fileSelect}/>
        </FormGroup>
        <FormGroup>
          <CustomInput id="create" type="radio" name="operationType" className="radio" label="Create New Table" value={create} checked={operationType === create} onChange={this.operationTypeSelect} inline/>
          <BlankColumn width={30}/>
          <CustomInput id="insert" type="radio" name="operationType" className="radio" label="Insert Existed Table" value={insert} checked={operationType === insert} onChange={this.operationTypeSelect} inline/>
        </FormGroup>
        <Button color="primary" onClick={this.analysisBtnClick}>Analysis</Button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      upload: uploadFileToServer
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadView)
