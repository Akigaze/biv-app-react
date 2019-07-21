import axios from "axios";

import {
  CHANGE_TABLE_NAME,
  OPEN_POP,
  CLOSE_POP,
  SAVE_INSERT_RESULT,
  SAVE_TABLE_CREATE_RESULT,
  SAVE_UPLOAD_RESULT,
  SET_UPLOADED_FILE,
  MODIFY_FIELD_NAME
} from "../constant/action-type/upload-action-type";
import {POP_TYPE} from "../constant/upload";

const formAxios = axios.create({
  baseURL: "http://localhost:9100",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

const jsonAxios = axios.create({
  baseURL: "http://localhost:9100",
  headers: {
    "Content-Type": "application/json"
  }
});

let popJob = null;

function setClosePopJob(dispatch){
  clearTimeout(popJob);
  popJob = setTimeout(() => {
    dispatch({type: CLOSE_POP})
  }, 20000)
}

export const openPop = (type, info) => {
  return (dispatch) => {
    dispatch({type: OPEN_POP, payload: {type, info}});
    setClosePopJob(dispatch);
  }
};

export const closePop = () => {
  return {type: CLOSE_POP}
};

export const changeTableName = (name) => {
  return {type: CHANGE_TABLE_NAME, payload: {name}}
};

export const doFileAnalyze = (file) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append("file", file);
    const url = `/file`;
    const response = await formAxios.post(url, data);
    if (response != null) {
      dispatch({type: SET_UPLOADED_FILE, payload: {file}});
      dispatch({type: SAVE_UPLOAD_RESULT, payload: {data: response.data}});
    }
  }
};

export const createTable = (tableName, fields, dropExist, operation) => {
  return async (dispatch) => {
    const url = `/table?operation=${operation}`;
    const data = {tableName, fields, dropExist};
    const response = await jsonAxios.post(url, data);
    if (response != null) {
      dispatch({type: SAVE_TABLE_CREATE_RESULT, payload: response.data});
      setClosePopJob(dispatch)
    }
  }
};

export const insertDate = (tableName, fields, file, operation) => {
  return async (dispatch) => {
    const url = `/table?operation=${operation}`;
    const data = new FormData();
    data.append("file", file);
    data.append("tableName", tableName);
    data.append("fields", JSON.stringify(fields));
    formAxios.post(url, data).then((response) => {
      if (response != null) {
        dispatch({type: SAVE_INSERT_RESULT, payload: response.data});
        setClosePopJob(dispatch)
      }
    }).catch(({response}) => {
        if(response.status === 404){
          dispatch({type: OPEN_POP, payload: {type: POP_TYPE.danger, info: `Table "${tableName}" not exists!`}});
          setClosePopJob(dispatch);
        }
      }
    );

  }
};

export const modifyFieldName = (id, name) => {
  return {type: MODIFY_FIELD_NAME, payload: {id, name}}
};