import React, { Component } from "react";
export class Tile extends Component {

    constructor(props) {
      super(props);
      this.state={
          type:props.type
      }
    }
    componentwillmount(){
        
    }

    render() {
        return  <div style={{width:'50px',color:'red'}}>
            <img src= {this.state.type}/> 
            <svg>
                <rect x="0" y="0" width="50" height="50"  fill={this.props.type} />
                
            </svg>        
        </div>
    }
}