import {
  SAVE_INSERT_RESULT,
  SAVE_TABLE_CREATE_RESULT,
  SAVE_UPLOAD_RESULT
} from "../constant/action-type/upload-action-type";

const initialState = {
  file: null,
  uploadResult: null,
  tableCreateResult: {},
  insertResult: {}
};

const uploadReducer = (state=initialState, action={}, ) => {
  const {type, payload} = action;
  switch (type) {
    case SAVE_UPLOAD_RESULT: {
      return {...state, uploadResult: payload.data}
    }
    case SAVE_TABLE_CREATE_RESULT: {
      const {table, file, success} = payload;
      return {...state, tableCreateResult: {table, file, success}}
    }
    case SAVE_INSERT_RESULT: {
      const {table, insertRows, success} = payload;
      return {...state, insertResult: {table, insertRows, success}}
    }
    default: return state;
  }
};

export default uploadReducer