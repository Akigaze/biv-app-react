import {combineReducers} from "redux"
import appReducer from "./app";
import uploadReducer from "./upload";

const bivReducer = combineReducers({
  app: appReducer,
  upload: uploadReducer
});

export default bivReducer;