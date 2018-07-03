import React, { Component } from "react";
import {MapEditor} from "./MapEditor";

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <MapEditor w={20} h={20}/>                
      </div>
    );
  }
}
