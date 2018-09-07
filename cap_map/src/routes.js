import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { MapBrowser } from "./components/MapBrowser";
import { Layout } from "./components/Layout";
import {Login} from "./components/Login";
import {Admin} from "./components/Admin";

export const routes = (
  <Layout>
    <Route exact path="/" component={HomePage} />
    <Route path="/browse" component={MapBrowser} />
    <Route path="/login" component={Login} />
    <Route path="/Admin" component={Admin} />
  </Layout>
);
