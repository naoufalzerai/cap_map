import React, { Component } from "react";
import {Tile} from "./Tile";

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <Tile type="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX/AAAZ4gk3AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"/>
      </div>
    );
  }
}
