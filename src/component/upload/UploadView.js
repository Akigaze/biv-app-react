import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Alert, Button, CustomInput, FormGroup, Label} from "reactstrap";

import "../../style/upload.css"
import {first} from "../../util/array-util";
import {OPERATION_TYPE} from "../../constant/upload";
import {BlankColumn} from "../common/blank";
import {closePop, doFileAnalyze, uploadFileToServer} from "../../action/upload";
import {isEmpty} from "lodash";
import UploadResultTable from "./UploadResultTable";

const {create, insert} = OPERATION_TYPE;

export class UploadView extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      file: {},
      showAnalysisResult: true,
    }
  }

  fileSelect = (event) => {
    const fileList = this.fileInput.current.files;
    this.setState({file: first(fileList) || {}})
  };

  analysisBtnClick = (event) => {
    const {file} = this.state;
    this.props.actions.upload(file)
  };

  alertToggle = () => {
    this.props.actions.closePopTip()
  };

  render() {
    const {analysisResult, pop} = this.props;
    const {file} = this.state;
    const fileLabel = file.name || "Choose a file";
    const hasUploadResult = !isEmpty(analysisResult);

    return (
      <div className="upload-view">
        <Alert color={pop.type} isOpen={!!pop.isOpen} toggle={this.alertToggle}>{pop.info}</Alert>
        <FormGroup>
          <Label for="file-upload">Select a upload file</Label>
          <CustomInput id="file-upload" type="file" innerRef={this.fileInput} label={fileLabel} onChange={this.fileSelect}/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" onClick={this.analysisBtnClick}>Analysis</Button>
        </FormGroup>
        {hasUploadResult && <UploadResultTable />}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    analysisResult: state.upload.analysisResult,
    pop: state.upload.pop
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      upload: doFileAnalyze,
      closePopTip: closePop
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadView)
