import {VIEW_IDS} from "../constant/views";
import {CHANGE_CURRENT_VIEW} from "../constant/app-action-type";

const initialState = {
  currentView: VIEW_IDS.upload
};

const appReducer = (state=initialState, action={}) => {
  const {type, payload} = action;
  switch (type) {
    case CHANGE_CURRENT_VIEW: {
      return {...state, currentView: payload.view}
    }
    default: return state;
  }
};

export default appReducer