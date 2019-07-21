import {
  CHANGE_TABLE_NAME,
  OPEN_POP,
  CLOSE_POP,
  SAVE_INSERT_RESULT,
  SAVE_TABLE_CREATE_RESULT,
  SAVE_UPLOAD_RESULT,
  SET_UPLOADED_FILE
} from "../constant/action-type/upload-action-type";
import {OPERATION_RESULT} from "../constant/upload";

const initialState = {
  file: null,
  tableName: null,
  analysisResult: null,
  tableCreateResult: {},
  insertResult: {},
  tableFields: null,
  pop: {}
};

const uploadReducer = (state=initialState, action={}) => {
  const {type, payload} = action;
  switch (type) {
    case SET_UPLOADED_FILE: {
      return {...state, file: payload.file}
    }
    case SAVE_UPLOAD_RESULT: {
      return {...state, analysisResult: payload.data, tableFields: payload.data.fields, tableName: payload.data.name}
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
    case OPEN_POP: {
      return {...state, pop: {type: payload.type, info: payload.info, isOpen: true}}
    }
    case CLOSE_POP: {
      return {...state, pop: {}}
    }
    case CHANGE_TABLE_NAME: {
      return {...state, tableName: payload.name}
    }
    default: return state;
  }
};

export default uploadReducer