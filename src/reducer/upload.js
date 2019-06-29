import {
  CLOSE_POP,
  SAVE_INSERT_RESULT,
  SAVE_TABLE_CREATE_RESULT,
  SAVE_UPLOAD_RESULT,
  SET_UPLOADED_FILE
} from "../constant/action-type/upload-action-type";
import {OPERATION_RESULT} from "../constant/upload";

const initialState = {
  file: null,
  uploadResult: null,
  tableCreateResult: {},
  insertResult: {},
  tableStructure: null,
  pop: {}
};

const uploadReducer = (state=initialState, action={}) => {
  const {type, payload} = action;
  switch (type) {
    case SET_UPLOADED_FILE: {
      return {...state, file: payload.file}
    }
    case SAVE_UPLOAD_RESULT: {
      return {...state, uploadResult: payload.data, tableStructure: payload.data}
    }
    case SAVE_TABLE_CREATE_RESULT: {
      const {table, success} = payload;
      const type = success ? OPERATION_RESULT.success : OPERATION_RESULT.fail;
      const pop = {type, isOpen: true, info: `Create ${table} ${type}!`};
      return {...state, pop, tableCreateResult: {table, success}}
    }
    case SAVE_INSERT_RESULT: {
      const {successRows, failRows, success, costTime} = payload;
      const type = success ? OPERATION_RESULT.success : OPERATION_RESULT.fail;
      const info = `Successfully insert ${successRows} rows, and ${failRows} rows insert fail! Cost time ${costTime} second`;
      const pop = {type, info, isOpen: true};
      return {...state, pop, insertResult: {...payload}}
    }
    case CLOSE_POP: {
      return {...state, pop: {}}
    }
    default: return state;
  }
};

export default uploadReducer