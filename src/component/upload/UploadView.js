import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Alert, Button, CustomInput, FormGroup, Label} from "reactstrap";

import "../../style/upload.css"
import {first} from "../../util/array-util";
import {OPERATION_TYPE} from "../../constant/upload";
import {BlankColumn} from "../common/blank";
import {closePop, uploadFileToServer} from "../../action/upload";
import {isEmpty} from "lodash";
import UploadResultTable from "./UploadResultTable";

const {create, insert} = OPERATION_TYPE;

export class UploadView extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      file: {},
      operationType: create,
      showAnalysisResult: true,
    }
  }

  fileSelect = (event) => {
    this.setState({file: first(this.fileInput.current.files)})
  };

  operationTypeSelect = (event) => {
    this.setState({operationType: event.target.value})
  };

  analysisBtnClick = (event) => {
    const {file, operationType} = this.state;
    this.props.actions.upload(file, operationType)
  };

  alertToggle = () => {
    this.props.actions.closePopTip()
  };

  render() {
    const {uploadResult, pop} = this.props;
    const {file, operationType} = this.state;
    const fileLabel = file.name || "Choose a file";
    const hasUploadResult = !isEmpty(uploadResult);

    return (
      <div className="upload-view">
        <Alert color={pop.type} isOpen={!!pop.isOpen} toggle={this.alertToggle}>{pop.info}</Alert>
        <FormGroup>
          <Label for="file-upload">Select a upload file</Label>
          <CustomInput id="file-upload" type="file" innerRef={this.fileInput} label={fileLabel} onChange={this.fileSelect}/>
        </FormGroup>
        <FormGroup>
          <CustomInput id="create" type="radio" name="operationType" className="radio" label="Create New Table" value={create} checked={operationType === create} onChange={this.operationTypeSelect} inline/>
          <BlankColumn width={30}/>
          <CustomInput id="insert" type="radio" name="operationType" className="radio" label="Insert Existed Table" value={insert} checked={operationType === insert} onChange={this.operationTypeSelect} inline/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" onClick={this.analysisBtnClick}>Analysis</Button>
        </FormGroup>
        {hasUploadResult &&
          <UploadResultTable />
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    uploadResult: state.upload.uploadResult,
    pop: state.upload.pop
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      upload: uploadFileToServer,
      closePopTip: closePop
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadView)
