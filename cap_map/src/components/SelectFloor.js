import React, { Component } from 'react';
import logo from '../svg/logo.svg';
import * as d3 from "d3";
import maps from "../json/maps.json";
import '../css/App.css';

export class SelectFloor extends Component {
  constructor() {
    super();
    this.state = { 
      maps : maps,
      SvgMap :"",
      svg : ""
    }      
}

SelSwitchMapChange(elm){
  var tab = this.state.maps.filter(function (map) {
    return map.uid == elm.target.value;
});
let selectedFloor = '../svg/floor1.svg';
switch(tab[0].uid) {
  case 'map_2':
    //selectedFloor = require("../svg/floor2.svg");
    break;
  default:
    //selectedFloor = require("../svg/floor1.svg");
    break;
}

this.setState({
  SvgMap : selectedFloor
})
console.log(selectedFloor);
/*
fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg")
  .then(response => response.text())
  .then(svg => document.body.insertAdjacentHTML("test", svg));
*/
}
  render() {
    
    return (
      <div className="form-group">
      <label>Switch Maps : </label>
      <select id="switchMaps" className="form-control"  onChange={this.SelSwitchMapChange.bind(this)}>
      <option value="0">Veuillez sélectionner une valeur</option>
      {
                this.state.maps.map(function (item) {
                    return <option value={item.uid }>{item.title}</option>;
                })
            }
      </select>
      <div className="row">
    <div className="floorMap">
    <img src={this.state.SvgMap} />
    <div id="test"></div>
   
    </div>
    </div>

    </div>
    );
  }
}
