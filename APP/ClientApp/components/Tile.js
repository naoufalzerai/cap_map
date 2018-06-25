import React, { Component } from "react";
export class Tile extends Component {

    constructor(props) {
      super(props);
      
    }
  
    render() {
        return <div>
            <img src= {this.props.type}/>           
        </div>
    }
}