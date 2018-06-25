import React, { Component } from "react";
export class Tile extends Component {

    constructor(props) {
      super(props);
      this.state={
          type:props.type
      }
    }
    componentwillmount(){
        //
    }

    render() {
        return <div style={{width:'50px',color:'red'}}>
            <img src= {this.state.type}/> 
            <svg>
                <circle cx={50} cy={50} r={10} fill="red" />
            </svg>        
        </div>
    }
}