import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';

import bivReducer from "./reducer";
import {actionLog} from "./util/biv-thunk";
import App from "./app";

const store = createStore(bivReducer, applyMiddleware(actionLog, thunk));

let app = <Provider store={store}><App/></Provider>;

ReactDOM.render(app, document.getElementById("root"));
