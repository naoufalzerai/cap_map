import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { MapBrowser } from "./components/MapBrowser";
import { Layout } from "./components/Layout";
import { SelectFloor } from "./components/SelectFloor"

<<<<<<< HEAD
export const routes = (
  <Layout>
    <Route exact path="/" component={HomePage} />
    <Route path="/browse" component={MapBrowser} />
    <Route path="/selectFloor" component={SelectFloor} />
  </Layout>
);
=======
export const routes = 
        <Layout>
            <Route exact path="/" component={HomePage} />
           <Route path="/browse" component={MapBrowser} />
         </Layout>;
>>>>>>> c2be65af9c7e14333d18fd365139e8b114f972c0
