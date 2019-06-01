import {VIEW_IDS} from "../constant/views";

const initialState = {
  currentView: VIEW_IDS.empty
};

const appReducer = (state=initialState, action={}) => {
  const {type, payload} = action;
  switch (type) {
    default: return state;
  }
};

export default appReducer