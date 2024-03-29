import React, {Component} from "react";
import classNames from "classnames";
import {Table} from "reactstrap";
import EditableCell from "./EditableCell";

export class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {headers, tableName, data} = this.props;

    return (
      <div className="data-table">
        <Table striped size="sm">
          <TableHeaderRow headers={headers}/>
          <tbody>
            {data.map((row, index) => <TableBodyRow key={index} index={index + 1} row={row}/>)}
          </tbody>
        </Table>
      </div>
    )
  }
}

const TableHeaderRow = ({headers}) => {
  return (
    <thead>
      <tr>
        <th>#</th>
        {headers.map(header => <th key={header}>{header}</th>)}
      </tr>
    </thead>
  )
};

const TableBodyRow = ({index, row}) => {
  return (
    <tr>
      <th scope="row">{index}</th>
      {Object.values(row).map((value, i) => {
        if(!isEditable(i)){
          return <th key={i}>{value}</th>
        }else {
          return <EditableCell key={i} id={row.id}>{value}</EditableCell>
        }
      })}
    </tr>
  )
};

const editableCellIndexes = {
  2: true
};

const isEditable = (index) => {
  return !!editableCellIndexes[index]
};

