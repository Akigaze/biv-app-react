import React, {Component} from "react";
import PropTypes from "prop-types";
import {isFunction} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {modifyFieldName} from "../../action/upload";


const ENTER_CODE = 13;

export class EditableCell extends Component{
  constructor(props){
    super(props);
    this.state = {
      editing: false
    }
  }

  toEdit = (event) => {
    const {editing} = this.state;
    if (!editing) {
      const cell = this.refs.cell;
      cell.setAttribute("contentEditable", true);
      cell.focus();
      this.setState({editing: true})
    }
  };

  endEdit = () =>{
    const {id, children} = this.props;
    const cell = this.refs.cell;
    cell.setAttribute("contentEditable", false);
    cell.blur();
    this.setState({editing: false});
    cell.textContent !== children && this.props.actions.modify(id, cell.textContent);
  };

  editComplete = (event) => {
    const {editing} = this.state;
    if (editing && event.keyCode === ENTER_CODE){
      event.preventDefault();
      this.endEdit();
    }
  };

  cellBlur = (event) => {
    const {editing} = this.state;
    if (editing){
      this.endEdit();
    }
  };

  render(){
    const {editing} = this.state;
    const style = {
      backgroundColor: editing ? "#E2FFFF" : "#FFFDF7"
    };
    return(
      <td ref="cell" onDoubleClick={this.toEdit} onKeyDown={this.editComplete} onBlur={this.cellBlur} style={style}>
        {this.props.children}
      </td>
    )
  }
}

EditableCell.propsType = {
  id: PropTypes.number,
  modify: PropTypes.func
};

EditableCell.defaultProps = {

};

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      modify: modifyFieldName
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableCell)