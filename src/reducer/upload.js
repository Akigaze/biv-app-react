import {SAVE_UPLOAD_RESULT} from "../constant/action-type/upload-action-type";

const initialState = {
  file: null,
  uploadResult: null
};

const uploadReducer = (state=initialState, action={}, ) => {
  const {type, payload} = action;
  switch (type) {
    case SAVE_UPLOAD_RESULT: {
      return {...state, uploadResult: payload.data}
    }
    default: return state;
  }
};

export default uploadReducer