import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Button, Collapse, CustomInput, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";

import "../../style/upload.css"
import {OPERATION_TYPE} from "../../constant/upload";
import {BlankColumn} from "../common/blank";
import {changeTableName, createTable, insertDate} from "../../action/upload";
import {isEmpty} from "lodash";
import {DataTable} from "../common/DataTable";

const tableHeaders = [
  "Index",
  "Field of Excel",
  "Field of Database",
  "Type of Database"
];

export class UploadResultTable extends Component {
  constructor(props) {
    super(props);
    this.tableNameInput = React.createRef();
    this.dropExist = React.createRef();
    this.state = {
      showAnalyzeResult: true
    }
  }

  resultTableOpen = () => {
    const {showAnalyzeResult} = this.state;
    this.setState({showAnalyzeResult: !showAnalyzeResult})
  };

  createBtnClick = () => {
    const {tableName, uploadResult} = this.props;
    const isDropExist = this.dropExist.current.checked;
    const fields = uploadResult.fields.map(field => {
      return {name: field.nameOfDatabase, type: field.type}
    });
    this.props.actions.create(tableName, fields, isDropExist, OPERATION_TYPE.create)
  };

  insertBtnClick = () => {
    const {tableName, tableStructure, uploadedFile} = this.props;
    let {fields} = tableStructure;
    this.props.actions.insert(tableName, fields, uploadedFile, OPERATION_TYPE.insert)
  };

  changeTableName = (event) => {
    const newName = event.target.value.trim();
    this.props.actions.setTableName(newName);
  };

  render() {
    const {uploadResult, tableName} = this.props;
    const {showAnalyzeResult} = this.state;

    return (
      <div>
        <FormGroup>
          <div className="blank-row" id="analysisResultTable" onClick={this.resultTableOpen}>
            <Label>Upload information over view</Label>
          </div>
          <Collapse isOpen={showAnalyzeResult}>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Table Name</InputGroupAddon>
                <Input innerRef={this.tableNameInput} id="table-name" type="text" value={tableName}
                       onChange={this.changeTableName}/>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <DataTable headers={tableHeaders} data={uploadResult.fields}/>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Total Row Number</InputGroupAddon>
                <Input id="row-count" type="text" disabled value={uploadResult.count}/>
              </InputGroup>
            </FormGroup>
          </Collapse>
        </FormGroup>
        <FormGroup>
          <CustomInput id="dropIfExist" type="checkbox" innerRef={this.dropExist} label="Drop if existed" inline/>
          <Button color="primary" onClick={this.createBtnClick}>Create</Button>
          <BlankColumn width={30}/>
          <Button color="primary" onClick={this.insertBtnClick}>Insert</Button>
        </FormGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    uploadedFile: state.upload.file,
    uploadResult: state.upload.uploadResult,
    createResult: state.upload.tableCreateResult,
    insertResult: state.upload.insertResult,
    tableStructure: state.upload.tableStructure,
    tableName: state.upload.tableName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      create: createTable,
      insert: insertDate,
      setTableName: changeTableName
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadResultTable)
