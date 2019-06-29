import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Alert, Button, Collapse, CustomInput, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";

import "../../style/upload.css"
import {first} from "../../util/array-util";
import {OPERATION_TYPE} from "../../constant/upload";
import {BlankColumn} from "../common/blank";
import {createTable, insertDate, uploadFileToServer} from "../../action/upload";
import {isEmpty} from "lodash";
import {DataTable} from "../common/DataTable";

const {create, insert} = OPERATION_TYPE;
const tableHeaders = [
  "Index",
  "Field of Excel",
  "Field of Database",
  "Type of Database"
];

export class UploadView extends Component {
  constructor(props) {
    super(props);
    this.fileInout = React.createRef();
    this.tableNameInout = React.createRef();
    this.dropExist = React.createRef();
    this.state = {
      file: {},
      operationType: create,
      showAnalysisResult: true,
      createAlertVisible: true,
      insertAlertVisible: true
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
    let {fields} = this.props.uploadResult;
    const tableName = this.tableNameInout.current.value;
    const isDropExist = this.dropExist.current.checked;
    fields = fields.map(field => {
      return {name: field.nameOfDatabase, type: field.type}
    });
    this.props.actions.create(tableName, fields, isDropExist, create)
  };

  insertBtnClick = () => {
    const {uploadResult, createResult} = this.props;
    const {table} = createResult;
    const {file} = this.state;
    const fields = uploadResult.fields.map(field => {
      const {index, nameOfDatabase, type} = field;
      return {index, name: nameOfDatabase, type: type}
    });
    this.props.actions.insert(table, fields, file, insert)
  };

  alertToggle = () => {
    this.setState({createAlertVisible: false})
  };


  render() {
    const {uploadResult, createResult, insertResult} = this.props;
    const {file, operationType, showAnalysisResult, createAlertVisible, insertAlertVisible} = this.state;
    const fileLabel = file.name || "Choose a file";
    const hasUploadResult = !isEmpty(uploadResult);
    const showCreateAlert = !isEmpty(createResult) && createResult.success && createAlertVisible;
    const showInsertAlert = !isEmpty(insertResult) && insertResult.success && insertAlertVisible;

    return (
      <div className="upload-view">
        <Alert color="success" isOpen={showCreateAlert} toggle={this.alertToggle}>
          {`Table ${createResult.table} create successfully! File id is ${createResult.file}, ready to insert data.`}
        </Alert>
        <Alert color="success" isOpen={showInsertAlert} toggle={this.alertToggle}>
          {`Table ${insertResult.table} insert successfully! Insert total ${insertResult.insertRows} rows.`}
        </Alert>
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
                    <Input innerRef={this.tableNameInout} id="table-name" type="text" defaultValue={uploadResult.name}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <DataTable headers={tableHeaders} data={uploadResult.fields}/>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Total Row Number</InputGroupAddon>
                    <Input id="row-count" type="text" disabled defaultValue={uploadResult.count}/>
                  </InputGroup>
                </FormGroup>
              </Collapse>
            </FormGroup>
            <FormGroup>
              <CustomInput id="dropIfExist" type="checkbox" innerRef={this.dropExist} label="Drop if existed" inline />
              <Button color="primary" onClick={this.createBtnClick}>Create</Button>
              <BlankColumn width={30}/>
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
    uploadResult: state.upload.uploadResult,
    createResult: state.upload.tableCreateResult,
    insertResult: state.upload.insertResult
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
