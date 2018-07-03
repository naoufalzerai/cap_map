import React, { Component } from "react";
export class MapEditor extends Component {

    constructor(props) {
      super(props);
      
      let rows=[];
      for(let i=0;i<10;i++){
            let tmp=[];
            for(let j=0;j<5;j++){
                tmp.push(<rect x={(i*10)+"%"} y={(j*10)+"%"} width="10%" height="10%"  fill="gray" />);
            }
            rows.push(<g>{tmp}</g>);
        }
        this.state={
            rows:rows
        };
    }
  
    render() {
        return (
        
        <div className="map-editor">
            <style>
            rect:hover{'{'}
                    fill: white;
                {'}'}
            </style>
            <svg id="mute-audio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" >
               {this.state.rows}
            </svg>
        </div>
        )
    }
}