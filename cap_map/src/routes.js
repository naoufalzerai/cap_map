import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { MapBrowser } from "./components/MapBrowser";
import { Layout } from "./components/Layout";

export const routes = (
  <Layout>
    <Route exact path="/" component={HomePage} />
    <Route path="/browse" component={MapBrowser} />
  </Layout>
);
