import axios from "axios";

import {
  CHANGE_TABLE_NAME,
  CLOSE_POP,
  SAVE_INSERT_RESULT,
  SAVE_TABLE_CREATE_RESULT,
  SAVE_UPLOAD_RESULT,
  SET_UPLOADED_FILE
} from "../constant/action-type/upload-action-type";

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

export const setUploadedFile = (file) => {
  return {type: SET_UPLOADED_FILE, file}
};

export const closePop = () => {
  return {type: CLOSE_POP}
};

export const changeTableName = (name) => {
  return {type: CHANGE_TABLE_NAME, payload: {name}}
};

export const uploadFileToServer = (file, operation) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append("file", file);
    const url = `/file?operation=${operation}`;
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
    const response = await formAxios.post(url, data);
    if (response != null) {
      dispatch({type: SAVE_INSERT_RESULT, payload: response.data});
      setClosePopJob(dispatch)
    }
  }
};