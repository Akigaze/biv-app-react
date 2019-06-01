import axios from "axios";

import {SAVE_UPLOAD_RESULT} from "../constant/action-type/upload-action-type";

const fileAxios = axios.create({
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


export const uploadFileToServer = (file, operation) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append("file", file);
    const url = `/file?operation=${operation}`;
    const response = await fileAxios.post(url, data);
    if (response != null) {
      dispatch({type: SAVE_UPLOAD_RESULT, payload: {data: response.data}});
    }
  }
};

export const createTable = (tableName, fields, operation) => {
  return async (dispatch) => {
    const url = `/table?operation=${operation}`;
    const data = {tableName, fields};
    const response = await jsonAxios.post(url, data);
    if (response != null) {
      dispatch({});
    }
  }
};

export const insertDate = (file, operation) => {
  return async (dispatch) => {
    dispatch({});

  }
};