import React, { Component } from "react";
import {Tile} from "./Tile";

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <Tile type={1}/>        
      </div>
    );
  }
}
