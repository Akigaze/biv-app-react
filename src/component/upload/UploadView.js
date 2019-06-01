import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Button, Collapse, CustomInput, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";

import "../../style/upload.css"
import {first} from "../../util/array-util";
import {OPERATION_TYPE} from "../../constant/upload";
import {BlankColumn} from "../common/blank";
import {createTable, insertDate, uploadFileToServer} from "../../action/upload";
import {isEmpty} from "lodash";
import {DataTable} from "../common/DataTable";

const {create, insert} = OPERATION_TYPE;
const tableHeaders = [
  "Field of Excel",
  "Field of Database",
  "Type of Database"
];

export class UploadView extends Component {
  constructor(props) {
    super(props);
    this.fileInout = React.createRef();
    this.state = {
      file: {},
      operationType: create,
      showAnalysisResult: true
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

  resultTableOpen = () => {
    const {showAnalysisResult} = this.state;
    this.setState({showAnalysisResult: !showAnalysisResult})
  };

  createBtnClick = () => {

  };

  insertBtnClick = () => {

  };


  render() {
    const {uploadResult} = this.props;
    const {file, operationType, showAnalysisResult} = this.state;
    const fileLabel = file.name || "Choose a file";
    const hasUploadResult = !isEmpty(uploadResult);

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
        <FormGroup>
          <Button color="primary" onClick={this.analysisBtnClick}>Analysis</Button>
        </FormGroup>
        {hasUploadResult &&
          <Fragment>
            <FormGroup>
              <div className="blank-row" id="analysisResultTable" onClick={this.resultTableOpen}>
                <Label >Upload information over view</Label>
              </div>
              <Collapse isOpen={showAnalysisResult && hasUploadResult}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Table Name</InputGroupAddon>
                    <Input id="table-name" type="text" defaultValue={uploadResult.name}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <DataTable headers={tableHeaders} data={uploadResult.fields}/>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Total Row Number</InputGroupAddon>
                    <Input id="row-count" type="text" defaultValue={uploadResult.count}/>
                  </InputGroup>
                </FormGroup>
              </Collapse>
            </FormGroup>
            <FormGroup>
              <Button color="primary" onClick={this.createBtnClick}>Create</Button>
              <Button color="primary" onClick={this.insertBtnClick}>Insert</Button>
            </FormGroup>
          </Fragment>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    uploadResult: state.upload.uploadResult
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      upload: uploadFileToServer,
      create: createTable,
      insert: insertDate
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadView)
