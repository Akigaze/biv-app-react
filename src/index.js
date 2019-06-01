import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import bivReducer from "./reducer";
import thunk from 'redux-thunk';
import {actionLog} from "./util/biv-thunk";
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(bivReducer, applyMiddleware(actionLog, thunk));

let app = <Provider store={store}><App/></Provider>;

ReactDOM.render(app, document.getElementById("root"));
