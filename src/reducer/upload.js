import {
  CLOSE_POP,
  SAVE_INSERT_RESULT,
  SAVE_TABLE_CREATE_RESULT,
  SAVE_UPLOAD_RESULT
} from "../constant/action-type/upload-action-type";
import {OPERATION_RESULT} from "../constant/upload";

const initialState = {
  file: null,
  uploadResult: null,
  tableCreateResult: {},
  insertResult: {},
  pop: {}
};

const uploadReducer = (state=initialState, action={}, ) => {
  const {type, payload} = action;
  switch (type) {
    case SAVE_UPLOAD_RESULT: {
      return {...state, uploadResult: payload.data}
    }
    case SAVE_TABLE_CREATE_RESULT: {
      const {table, success} = payload;
      const type = success ? OPERATION_RESULT.success : OPERATION_RESULT.fail;
      const pop = {type, isOpen: true, info: `Create ${table} ${type}!`};
      return {...state, pop, tableCreateResult: {table, success}}
    }
    case SAVE_INSERT_RESULT: {
      const {table, insertRows, success} = payload;
      return {...state, insertResult: {table, insertRows, success}}
    }
    case CLOSE_POP: {
      return {...state, pop: {}}
    }
    default: return state;
  }
};

export default uploadReducer