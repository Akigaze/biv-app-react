import axios from "axios";

import {SAVE_UPLOAD_RESULT} from "../constant/action-type/upload-action-type";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9100",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});


export const uploadFileToServer = (file, operation) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append("file", file);
    const url = `/file?operation=${operation}`;
    const response = await axiosInstance.post(url, data);
    if (response != null) {
      dispatch({type: SAVE_UPLOAD_RESULT, payload: {data: response.data}});
    }
  }
};