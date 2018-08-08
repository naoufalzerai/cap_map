import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import * as RoutesModule from "./routes";
import registerServiceWorker from './registerServiceWorker';
let routes = RoutesModule.routes;

ReactDOM.render(<AppContainer>
                    <BrowserRouter children={routes} basename="" />
                </AppContainer>
    , document.getElementById('root'));
registerServiceWorker();
