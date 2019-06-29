import axios from "axios";

import {
  CLOSE_POP,
  SAVE_INSERT_RESULT,
  SAVE_TABLE_CREATE_RESULT,
  SAVE_UPLOAD_RESULT
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

export const closePop = () => {
  return {type: CLOSE_POP}
};

export const uploadFileToServer = (file, operation) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append("file", file);
    const url = `/file?operation=${operation}`;
    const response = await formAxios.post(url, data);
    if (response != null) {
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
    }
  }
};