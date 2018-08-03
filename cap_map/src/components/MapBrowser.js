import React, { Component } from 'react';
import * as d3 from "d3";


export class MapBrowser extends Component {
    constructor(props) {
        super(props);    
        this._click=this._click.bind(this)    
    }
    componentDidMount(){
        this.node.onclick = this._click;
    }
    _click(e){
        let svg = d3.select(this.node)
        let mouse = d3.clientPoint(e.target, e);

        var pointer = svg
            .append("use")
            .attr("href", "#pointer")
            .attr("transform", "translate(" + mouse[0] + "," + mouse[1] + ")scale(0)")
            .attr("fill", "#039BE5")
            .attr("stroke", "#039BE5")
            .attr("stroke-width", "1px");

        pointer
            .transition()
            .duration(500)
            .attr("x", mouse[0])
            .attr("y", mouse[1])
            .attr("transform", "scale(1)");
        pointer.on("click", function () {
            alert('')
            d3.event.stopPropagation();
        });
    }
    render() {
        return (
            <div>
            <svg ref={node => this.node = node}
                width={500} height={500}>
                    <defs>
                        <g id="pointer" transform="scale(0.8)">
                            <path d="M0-1c-14.5-25.6-14.5-25.7-14.5-33.8c0-8.1,6.5-14.6,14.5-14.6s14.5,6.6,14.5,14.6C14.5-26.7,14.5-26.6,0-1z"></path>
                            <path d="M0-49c7.7,0,14,6.3,14,14.1c0,8,0,8.1-14,32.8c-14-24.7-14-24.9-14-32.8C-14-42.7-7.7-49,0-49 M0-50c-8.3,0-15,6.8-15,15.1 S-15-26.5,0,0c15-26.5,15-26.5,15-34.9S8.3-50,0-50L0-50z"></path>
                        </g>
                    </defs>

            </svg>
            
            </div>
        );
    }
}

