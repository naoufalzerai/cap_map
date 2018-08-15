import React, { Component } from 'react';
import * as d3 from "d3";
import {
    Container, ListGroupItem ,ListGroup,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Input,
    Footer
} from 'mdbreact';
import maps from "../json/maps.json";
import seats from "../json/seats.json";
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';

export class MapBrowser extends Component {
    constructor(props) {
        super(props);    
        this._click=this._click.bind(this)    
        this.state = { 
            maps : maps,
            seats : seats,
            modal: false,
            typeElement : "",
            search : "",
            selectedMap: "map_1"
          }
          this.toggle = this.toggle.bind(this);
          this.SwitchElementsType = this.SwitchElementsType.bind(this);
          this.SelSwitchMapChange = this.SelSwitchMapChange.bind(this);
          this.SelSwitchMapChangeSuite = this.SelSwitchMapChangeSuite.bind(this);
          this.validate = this.validate.bind(this);
          this.close = this.close.bind(this);
          this._handleChange = this._handleChange.bind(this);
          
    }
    _handleChange(e) {
        let {name, value} = e.target;
        this.setState({
            typeElement: value,
            seat : {uid: this.state.selectedMap,coords:this.state.seat.coords,name:"seatxx",type:value},
        
        });
        
        }
        componentWillMount() {
            console.log('zzzzzzzzzz');
            fetch("http://localhost:3000/json/maps.json")
          .then(response => response.text())
          .then(res => {
              console.log(res)
          });            
        }
        componentDidMount() {
            console.log('GrandChild did mount.');
            var tab = this.state.maps.filter(function (map) {
                return map.uid == this.state.selectedMap;
            },this);
            this.SelSwitchMapChangeSuite(tab[0]);
        }
    /*componentDidMount() {
        this.node.onclick = this._click;
        var svg = d3
          .select(this.node)
          .call(d3.zoom().on("zoom", function() {
              svg.attr("transform", d3.event.transform);
            }));       
        fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg")
            .then(response => response.text())
            .then(res => {
                let svg = d3.select(this.node);
                document.getElementById("map-container").insertAdjacentHTML("afterbegin", res);
                //this.node.insertAdjacentHTML("afterbegin", res);
            });
      
    }*/
    close(){
        this.setState({ modal: false });
      }
    toggle(svg,mouse) {
        this.setState({
          modal: !this.state.modal,
          seat : {coords:[mouse[0],mouse[1]],type:this.state.typeElement},
          map_container : d3.select("#map-container")
        });
        //let seat={coords:[mouse[0],mouse[1]],type:"collaborateur"}
        //var map_container = d3.select("#map-container");
        //

      }
      validate(){

        this.SwitchElementsType(this.state.seat,this.state.map_container);
        this.close();
      }
    _click(e){
        e=e.originalEvent
        let svg = d3.select(this.node)
        let mouse = d3.clientPoint(e.target, e);

        this.toggle(svg,mouse);
        /*var pointer = svg
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
            alert('sss');

            d3.event.stopPropagation();
        });*/
    }
    renderSeat = seat => {
        const {search} = this.state;
        var code = seat.name.toLowerCase()

        return  (
        
            <ListGroupItem  href="#" hover title={seat.name}>
                {seat.name.substring(0, 15)}{ seat.name.length > 15 && "..."}
            </ListGroupItem>
       );
           
    }
    onchange = e =>{
        this.setState({ search : e.target.value });
    }
    SwitchElementsType(seat,map_container){
        let node,text;
        switch(seat.type){
            case "Infirmerie":
             node = map_container
            .append("use")
            .attr("href", "#hos")
            .attr("transform", "translate(" + seat.coords[0] + "," +seat.coords[1] + ")")
            .attr("width", 20)
            .attr("height", 20);
            this.state.seats[this.state.selectedMap].push(seat);
            this.setState(
                this.state
            )
             //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Infirmerie').attr('fill', 'black');
    
            break;
            case "WC":
            node = map_container
            .append("use")
            .attr("href", "#WC")
            .attr("transform", "translate(" + seat.coords[0] + "," +seat.coords[1] + ")");
            this.state.seats[this.state.selectedMap].push(seat);
            this.setState(
                this.state
            )
            //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('WC').attr('fill', 'black');

            break;
            
            case "meetingRoom":
            node = map_container
            .append("use")
            .attr("href", "#meetingRoom")
            .attr("transform", "translate(" + seat.coords[0] + "," +seat.coords[1] + ")");
            this.state.seats[this.state.selectedMap].push(seat);
            this.setState(
                this.state
            )
            //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.15em').text('Meeting Room').attr('fill', 'black');
  
            break;
            case "visioRoom":
            node = map_container
            .append("use")
            .attr("href", "#visioRoom")
            .attr("transform", "translate(" + seat.coords[0] + "," +seat.coords[1] + ")");
            this.state.seats[this.state.selectedMap].push(seat);
            this.setState(
                this.state
            )
            //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Visio Room').attr('fill', 'black');
  
            break;
            case "escal":
            node = map_container
            .append("use")
            .attr("href", "#Escalier")
            .attr("transform", "translate(" + seat.coords[0] + "," +seat.coords[1] + ")");
            this.state.seats[this.state.selectedMap].push(seat);
            this.setState(
                this.state
            )
            //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Escalier').attr('fill', 'black');
            break;
            
            case "ascenseur":
            node = map_container
            .append("use")
            .attr("href", "#ascenseur")
            .attr("transform", "translate(" + seat.coords[0] + "," +seat.coords[1] + ")");
            this.state.seats[this.state.selectedMap].push(seat);
            this.setState(
                this.state
            )
            //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Ascenseur').attr('fill', 'black');
            break;

            case "collaborateur":
            node = map_container
            .append("use")
            .attr("href", "#user")
            .attr("transform", "translate(" + seat.coords[0] + "," +seat.coords[1] + ")");
            this.state.seats[this.state.selectedMap].push(seat);
            this.setState(
                this.state
            )
            //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Collaborateur').attr('fill', 'black');
            break;
            
        }
    }
    SelSwitchMapChangeSuite(tab){
        var svg = d3
        .select(this.node)
        .call(d3.zoom().on("zoom", function() {
            svg.attr("transform", d3.event.transform);
          }));
          document.getElementById("map-container").innerHTML = "";    
    //charger à partir d'un URL    
      fetch(tab.url)
          .then(response => response.text())
          .then(res => {
              let svg = d3.select(this.node);
              document.getElementById("map-container").insertAdjacentHTML("afterbegin", res);
              //this.node.insertAdjacentHTML("afterbegin", res);
          });

          // add Seats
          let selectedMap = tab.uid
          this.state.selectedMap = selectedMap;
          let tabSeats = this.state.seats[selectedMap];
          var map_container = d3.select("#map-container");
          this.state.seats[tab.uid]?
          this.state.seats[tab.uid].map(function (seat) {            
            this.SwitchElementsType(seat,map_container);        
          },this)
          :""
    }
    SelSwitchMapChange(elm){
        var tab = this.state.maps.filter(function (map) {
          return map.uid == elm.target.value;
      });
      //this.node.onclick = this._click;
      this.SelSwitchMapChangeSuite(tab[0]);

      }
    
    render() {
        const divBrowser = { overflow: "hidden", border: "1px solid #222222" };
        
    const {search} = this.state;

    const filteredCountries = this.state.seats[this.state.selectedMap].filter(seat => {
        return seat.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
        return (
            <div className="flyout">
            <Container>
            <main style={{marginTop: '1rem'}}>
            
                
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <Input icon="search" onChange={this.onchange}/>
                        </div>
                        <div className="col"></div>
                    </div>
                
            
        
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-2" >
                <div className="form-group">
                    <label className="col-form-label">Switch Maps : </label>
                    <select id="switchMaps" className="form-control form-control-sm"  onChange={this.SelSwitchMapChange.bind(this)}>
                        {
                        this.state.maps.map(function (item) {
                        return <option value={item.uid }>{item.title}</option>;
                        })
                        }
                    </select>
                </div>
                </div>

            <div className="col-8">
            <ReactSVGPanZoom
  width={750} height={400}
            onClick={event => this._click(event)}

  ref={pan => (this.pan = pan)} >

                <svg style={divBrowser}  ref={node => (this.node = node)} width={750} height={400}>
                <defs>
                <g id="hos" transform="scale(0.05)"><g><path fill="#EBEBEB" d="M140.014,0c77.323,0,140.014,62.691,140.014,140.014c0,77.314-62.691,140.014-140.014,140.014S0,217.336,0,140.014S62.682,0,140.014,0z"/><path fill="#E2574C" d="M78.749,113.787h35.135V78.749c0-4.83,3.912-8.751,8.742-8.751h34.968c4.822,0,8.733,3.92,8.733,8.751v35.03h34.951c4.839,0,8.751,3.912,8.751,8.751v35.012c0,4.848-3.912,8.768-8.751,8.768h-34.951v34.933c0,4.839-3.912,8.751-8.733,8.751h-34.968c-4.83,0-8.742-3.912-8.742-8.751V166.31H78.749c-4.839,0-8.76-3.92-8.76-8.768V122.53C69.989,117.699,73.91,113.787,78.749,113.787z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
                <g id="visioRoom" transform="scale(0.05)"><g><g><path d="M464.631,403.122C474.768,392.374,481,377.905,481,362c0-33.084-26.916-60-60-60s-60,26.916-60,60c0,15.965,6.28,30.482,16.484,41.243c-17.244,9.566-31.032,24.629-38.984,42.809c-7.952-18.179-21.74-33.242-38.984-42.809C309.72,392.482,316,377.965,316,362c0-33.084-26.916-60-60-60s-60,26.916-60,60c0,15.965,6.28,30.482,16.484,41.243c-17.244,9.566-31.032,24.629-38.984,42.809c-7.952-18.179-21.74-33.242-38.984-42.809C144.72,392.482,151,377.965,151,362c0-33.084-26.916-60-60-60s-60,26.916-60,60c0,15.905,6.233,30.374,16.369,41.122C19.596,418.3,0,447.562,0,482v15c0,8.284,6.716,15,15,15h482c8.284,0,15-6.716,15-15v-15C512,448.017,492.823,418.529,464.631,403.122z M91,332c16.542,0,30,13.458,30,30s-13.458,30-30,30s-30-13.458-30-30S74.458,332,91,332z M30,482c0-33.084,27.364-60,61-60c33.084,0,60,26.916,60,60H30z M256,332c16.542,0,30,13.458,30,30s-13.458,30-30,30s-30-13.458-30-30S239.458,332,256,332z M196,482c0-33.084,26.916-60,60-60s60,26.916,60,60H196z M421,332c16.542,0,30,13.458,30,30s-13.458,30-30,30s-30-13.458-30-30S404.458,332,421,332z M361,482c0-33.084,26.916-60,60-60c33.636,0,61,26.916,61,60H361z"/></g></g><g><g><path d="M466,0C456.896,0,83.745,0,46,0c-8.284,0-15,6.716-15,15v242c0,8.284,6.716,15,15,15c11.833,0,412.732,0,420,0c8.284,0,15-6.716,15-15V15C481,6.716,474.284,0,466,0z M91,242H61V30h30V242z M196,242c0-33.636,26.916-61,60-61s60,27.364,60,61H196z M226,121c0-16.542,13.458-30,30-30s30,13.458,30,30s-13.458,30-30,30S226,137.542,226,121z M391,242h-45c0-33.945-18.674-63.918-46.6-79.635C309.672,151.591,316,137.025,316,121c0-33.084-26.916-60-60-60s-60,26.916-60,60c0,16.025,6.328,30.591,16.6,41.365C185.397,177.676,166,207.247,166,242h-45V30h270V242z M451,242h-30V30h30V242z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
                <g id="meetingRoom" transform="scale(0.05)"><path d="M381.471,153.621h-21.562c-1.33-11.813-7.624-22.14-16.746-28.842v-6.77c0-20.936-17.032-37.969-37.969-37.969h-16.488c-20.937,0-37.969,17.033-37.969,37.969v29.013c-0.773-2.739-1.819-5.364-3.109-7.844v-21.169c0-20.936-17.032-37.969-37.969-37.969H193.17c-20.936,0-37.969,17.033-37.969,37.969v21.169c-1.29,2.48-2.336,5.104-3.109,7.844v-29.013c0-20.936-17.033-37.969-37.969-37.969H97.635c-20.937,0-37.97,17.033-37.97,37.969v6.771c-9.121,6.702-15.416,17.029-16.745,28.841H10.953C4.913,153.621,0,158.534,0,164.574v121.147c0,5.523,4.478,10,10,10s10-4.477,10-10v0v-87.383h22.649v32.979c0,5.523,4.478,10,10,10h7.016v5.369c-5.443,0.092-9.829,4.526-9.829,9.991s4.386,9.899,9.829,9.991v19.051v16.664c0,5.523,4.478,10,10,10s10-4.477,10-10V285.72v-19.043h27.748v19.043v16.664c0,5.523,4.478,10,10,10s10-4.477,10-10V285.72v-19.051c5.443-0.092,9.83-4.526,9.83-9.991s-4.387-9.9-9.83-9.991v-5.369h7.017c5.522,0,10-4.477,10-10v-32.979h6.095v32.979c0,5.523,4.478,10,10,10h7.016v5.369c-5.443,0.092-9.829,4.526-9.829,9.991s4.386,9.899,9.829,9.991v19.051v16.664c0,5.523,4.478,10,10,10s10-4.477,10-10V285.72v-19.043h27.748v19.043v16.664c0,5.523,4.478,10,10,10s10-4.477,10-10V285.72v-19.051c5.443-0.092,9.829-4.526,9.829-9.991s-4.386-9.899-9.829-9.991v-5.369h7.017c5.522,0,10-4.477,10-10v-32.979h6.095v32.979c0,5.523,4.478,10,10,10h7.016v5.369c-5.443,0.092-9.829,4.526-9.829,9.991s4.386,9.899,9.829,9.991v19.051v16.664c0,5.523,4.478,10,10,10s10-4.477,10-10V285.72v-19.043h27.748v19.043v16.664c0,5.523,4.478,10,10,10s10-4.477,10-10V285.72v-19.051c5.443-0.092,9.829-4.526,9.829-9.991s-4.386-9.899-9.829-9.991v-5.369h7.017c5.522,0,10-4.477,10-10v-32.979h12.244v87.383v0c0,5.523,4.478,10,10,10s10-4.477,10-10V164.574C392.424,158.534,387.511,153.621,381.471,153.621z M323.163,241.317v5.36h-27.748v-5.36H323.163z M340.18,221.317h-61.78V158.3c0-11.9,9.682-21.581,21.581-21.581h18.618c11.899,0,21.581,9.681,21.581,21.581V221.317z M193.17,100.04h16.489c9.908,0,17.969,8.061,17.969,17.969v2.316c-5.169-2.31-10.886-3.605-16.904-3.605h-18.618c-6.018,0-11.735,1.295-16.904,3.605v-2.316C175.201,108.1,183.262,100.04,193.17,100.04z M305.194,100.04c9.557,0,17.373,7.505,17.916,16.929c-1.483-0.161-2.987-0.249-4.512-0.249H299.98c-11.392,0-21.726,4.608-29.243,12.054v-10.765c0-9.908,8.061-17.969,17.969-17.969H305.194z M144.43,173.621h6.095v4.717h-6.095V173.621z M252.305,173.621h6.095v4.717h-6.095V173.621z M132.092,118.008v10.765c-7.518-7.446-17.851-12.054-29.243-12.054H84.23c-1.525,0-3.03,0.088-4.513,0.249c0.543-9.423,8.36-16.929,17.917-16.929h16.488C124.031,100.04,132.092,108.1,132.092,118.008z M20,173.621h22.649v4.717H20V173.621z M107.413,241.317v5.36H79.665v-5.36H107.413z M124.43,221.317h-61.78V158.3c0-11.9,9.682-21.581,21.581-21.581h18.618c11.899,0,21.581,9.681,21.581,21.581V221.317z M215.288,241.317v5.36H187.54v-5.36H215.288z M232.305,221.317h-61.78V158.3c0-11.9,9.682-21.581,21.581-21.581h18.618c11.899,0,21.581,9.681,21.581,21.581V221.317z M360.18,173.621h12.244v4.717H360.18V173.621z"/></g>
                <g id="WC" transform="scale(0.05)"><path d="M313.002,0H82C36.785,0,0,36.784,0,81.998v230.993C0,358.211,36.785,395,82,395h231.002C358.216,395,395,358.211,395,312.991V81.998C395,36.784,358.216,0,313.002,0z M380,312.991C380,349.94,349.944,380,313.002,380H82c-36.944,0-67-30.06-67-67.009V81.998C15,45.056,45.056,15,82,15h231.002C349.944,15,380,45.056,380,81.998V312.991z"/><path d="M285.273,137.172c19.24,0,34.846-15.59,34.846-34.83c0-19.241-15.605-34.842-34.846-34.842c-19.236,0-34.842,15.601-34.842,34.842C250.432,121.582,266.037,137.172,285.273,137.172z"/><path d="M344.196,227.304c-2.772-36.906-7.223-56.038-15.873-68.239c-11.135-15.704-28.06-17.02-43.05-17.02c-14.989,0-31.914,1.315-43.048,17.02c-8.648,12.199-13.099,31.331-15.873,68.238c-0.458,6.087,4.107,11.393,10.194,11.851c0.281,0.021,0.561,0.031,0.84,0.031c5.729,0,10.574-4.42,11.011-10.225c1.683-22.39,4.044-37.762,7.399-47.725v46.257c0,2.321,0.277,4.576,0.784,6.743V327.5c0,7.122,5.773,12.896,12.896,12.896c7.122,0,12.896-5.773,12.896-12.896v-70.675c0.955,0.093,1.922,0.144,2.901,0.144c0.982,0,1.953-0.051,2.911-0.145V327.5c0,7.122,5.773,12.896,12.896,12.896c7.122,0,12.895-5.773,12.895-12.896v-93.307c0.501-2.154,0.774-4.395,0.774-6.701v-46.268c3.359,9.963,5.719,25.338,7.401,47.735c0.457,6.088,5.763,10.659,11.851,10.194C340.089,238.697,344.653,233.392,344.196,227.304z"/><path d="M109.727,137.172c19.238,0,34.846-15.59,34.846-34.83c0-19.241-15.607-34.842-34.846-34.842c-19.238,0-34.846,15.601-34.846,34.842C74.881,121.582,90.488,137.172,109.727,137.172z"/><path d="M152.775,159.065c-11.134-15.705-28.059-17.02-43.049-17.02c-14.989,0-31.914,1.315-43.049,17.02c-8.65,12.2-13.101,31.333-15.874,68.239c-0.457,6.088,4.106,11.394,10.194,11.851c6.088,0.47,11.393-4.106,11.851-10.194c1.683-22.401,4.042-37.794,7.401-47.758v33.339l-10.978,49.316c-0.214,0.96,0.021,1.964,0.635,2.732c0.615,0.767,1.545,1.213,2.528,1.213h8.587V327.5c0,7.122,5.773,12.896,12.896,12.896c7.122,0,12.896-5.773,12.896-12.896v-59.698h5.811V327.5c0,7.122,5.773,12.896,12.896,12.896c7.122,0,12.895-5.773,12.895-12.896v-59.698h8.601c0.007,0,0.015,0.001,0.02,0c1.79,0,3.241-1.45,3.241-3.24c0-0.369-0.063-0.724-0.176-1.055l-10.898-48.956v-33.346c3.358,9.964,5.716,25.356,7.399,47.755c0.437,5.806,5.282,10.225,11.011,10.225c0.277,0,0.559-0.01,0.84-0.031c6.088-0.457,10.651-5.763,10.194-11.851C165.874,190.396,161.424,171.265,152.775,159.065z"/><path d="M197.5,61.241c-5.669,0-10.264,4.595-10.264,10.264v251.993c0,5.669,4.595,10.264,10.264,10.264s10.264-4.595,10.264-10.264V71.505C207.764,65.836,203.169,61.241,197.5,61.241z"/></g>
                <g id="Escalier" transform="scale(0.5)"><path fill="#010002" d="M40.058,38.852c-2.189-4.013-2.734-10.781-1.219-15.097c0.106-0.307,0.129-0.586,0.094-0.841c0.166-0.493,0.208-1.056,0.076-1.675c-0.479-2.282-0.781-4.596-1.11-6.906c1.265,1.089,2.563,2.135,3.959,3.062c2.003,1.328,3.863-1.891,1.876-3.209c-2.506-1.661-4.645-3.776-6.902-5.747c-0.018-0.016-0.037-0.025-0.056-0.041c-1.394-2.906-6.483-1.222-5.718,2.396c0.146,0.698,0.273,1.4,0.395,2.104c-0.879,1.81-3.438,3.124-4.631,4.512c-1.552,1.809,1.064,4.449,2.627,2.627c0.815-0.949,1.776-1.755,2.689-2.573c0.193,1.367,0.395,2.731,0.642,4.088c-4.524,1.401-7.301,4.68-7.789,9.446c-0.245,2.383,3.474,2.357,3.716,0c0.325-3.174,2.348-5.085,5.315-5.946c0.176-0.051,0.326-0.123,0.464-0.204c0.062,0.028,0.123,0.057,0.188,0.081c-1.019,5.068-0.125,11.58,2.177,15.797c0.332,0.609,0.837,0.876,1.358,0.908h-5.361v-8.35H21.514v-8.376H7.736L7.712,52.295l36.349-0.004V41.636h-5.617C39.65,41.55,40.825,40.255,40.058,38.852z M42.822,42.877v8.178L8.951,51.058l0.021-24.91h11.304v8.378h11.333v8.351C31.609,42.877,42.822,42.877,42.822,42.877z"/><circle fill="#010002" cx="30.191" cy="3.406" r="3.406"/></g>
                <g id="ascenseur" transform="scale(0.05)"><path d="m497.199219 0h-481.648438c-8.3125 0-15.050781 6.738281-15.050781 15.050781v481.898438c0 8.3125 6.738281 15.050781 15.050781 15.050781h481.648438c8.3125 0 15.050781-6.738281 15.050781-15.050781v-481.898438c0-8.3125-6.738281-15.050781-15.050781-15.050781zm-252.867188 481.898438h-114.390625v-346.808594h114.390625zm30.105469-346.808594h114.390625v346.808594h-114.390625zm207.707031 346.808594h-63.214843v-361.859376c0-8.3125-6.738282-15.050781-15.050782-15.050781h-288.988281c-8.3125 0-15.050781 6.738281-15.050781 15.050781v361.859376h-69.238282v-451.796876h451.542969zm0 0"/><path d="m54.683594 344.96875h19.402344c8.3125 0 15.050781-6.738281 15.050781-15.050781s-6.738281-15.050781-15.050781-15.050781h-19.402344c-8.3125 0-15.050782 6.738281-15.050782 15.050781s6.738282 15.050781 15.050782 15.050781zm0 0"/><path d="m54.683594 308.011719h19.402344c8.3125 0 15.050781-6.742188 15.050781-15.054688s-6.738281-15.050781-15.050781-15.050781h-19.402344c-8.3125 0-15.050782 6.738281-15.050782 15.050781s6.738282 15.054688 15.050782 15.054688zm0 0"/><path d="m54.683594 271.050781h19.402344c8.3125 0 15.050781-6.738281 15.050781-15.050781s-6.738281-15.050781-15.050781-15.050781h-19.402344c-8.3125 0-15.050782 6.738281-15.050782 15.050781s6.738282 15.050781 15.050782 15.050781zm0 0"/><path d="m187.136719 81.527344h134.460937c8.3125 0 15.050782-6.738282 15.050782-15.050782s-6.738282-15.050781-15.050782-15.050781h-134.460937c-8.3125 0-15.050781 6.738281-15.050781 15.050781s6.738281 15.050782 15.050781 15.050782zm0 0"/></g>
                <g id="user" transform="scale(0.05)"><path d="M394.235,333.585h-30.327c-33.495,0-60.653-27.158-60.653-60.654v-19.484c13.418-15.948,23.042-34.812,29.024-54.745c0.621-3.36,3.855-5.02,6.012-7.33c11.611-11.609,13.894-31.2,5.185-45.149c-1.186-2.117-3.322-3.953-3.201-6.576c0-17.784,0.089-35.596-0.023-53.366c-0.476-21.455-6.608-43.773-21.65-59.66c-12.144-12.836-28.819-20.479-46.022-23.75c-21.739-4.147-44.482-3.937-66.013,1.54c-18.659,4.709-36.189,15.637-47.028,31.836c-9.598,14.083-13.803,31.183-14.513,48.036c-0.266,18.094-0.061,36.233-0.116,54.371c0.413,3.631-2.667,6.088-4.058,9.094c-8.203,14.881-4.592,35.155,8.589,45.978c3.344,2.308,3.97,6.515,5.181,10.142c5.748,17.917,15.282,34.487,27.335,48.925v20.138c0,33.496-27.157,60.654-60.651,60.654H90.978c0,0-54.964,15.158-90.978,90.975v30.327c0,16.759,13.564,30.321,30.327,30.321h424.562c16.759,0,30.322-13.562,30.322-30.321V424.56C449.199,348.749,394.235,333.585,394.235,333.585z"/></g>
                <g id="pointer" transform="scale(0.8)">
                  <path d="M0-1c-14.5-25.6-14.5-25.7-14.5-33.8c0-8.1,6.5-14.6,14.5-14.6s14.5,6.6,14.5,14.6C14.5-26.7,14.5-26.6,0-1z" />
                  <path d="M0-49c7.7,0,14,6.3,14,14.1c0,8,0,8.1-14,32.8c-14-24.7-14-24.9-14-32.8C-14-42.7-7.7-49,0-49 M0-50c-8.3,0-15,6.8-15,15.1 S-15-26.5,0,0c15-26.5,15-26.5,15-34.9S8.3-50,0-50L0-50z" />
                </g>
                <g id="map-container" className="#map-container" />
                </defs>
                <use href="#map-container" x={0} y={0} />
                </svg>
                </ReactSVGPanZoom>
            </div>

    <div className="col-2">
            <ListGroup href="#" hover >
                        {
                            filteredCountries.map(seat => {
                                return this.renderSeat(seat)
                            })
                        }
            </ListGroup>
    </div>

</div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Create Position</ModalHeader>
          <ModalBody>
          <select className="mdb-select" onChange={this._handleChange}>
            <option value="" defaultValue>Choose your option</option>
            <option value="collaborateur">Collaborateur</option>
            <option value="visioRoom">Visio-Room</option>
            <option value="meetingRoom">Meeting-Room</option>
            <option value="WC">WC</option>
            <option value="escal">Escalier</option>
            <option value="ascenseur">Ascenseur</option>
            <option value="Infirmerie">Infirmerie</option>
          </select>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.close}>Close</Button>
            <Button color="primary" onClick={this.validate}>Save changes</Button>
          </ModalFooter>
        </Modal>

          
                    
                    <Footer color="indigo">
                <p className="footer-copyright mb-0">
                &copy; {(new Date().getFullYear())} Copyright
                </p>
            </Footer>
                    
            </main>
                   </Container> </div> );
    }
}

