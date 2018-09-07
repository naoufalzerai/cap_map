import React, { Component } from "react";
import * as d3 from "d3";
import {
  Container,
  ListGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Footer,
  ListGroupItem
} from "mdbreact";
import maps from "../json/maps.json";
import seats from "../json/seats.json";
import legende from "../svg/legende.svg";
import {  ReactSVGPanZoom } from "react-svg-pan-zoom";
import { AutoSizer } from "react-virtualized";

export class MapBrowser extends Component {
  constructor(props) {
    super(props);
    this._click = this._click.bind(this);
    this.state = {
      maps: maps,
      seats: seats,
      modal: false,
      modalAffect: false,
      typeElement: "",
      search: "",
      selectedMap: "RDC",
      selectedplace: {
        uid: "",
        coords: [],
        name: "",
        type: "",
        picture:""
      }
    };
    this.pan = null;
    this.toggle = this.toggle.bind(this);
    this.SwitchElementsType = this.SwitchElementsType.bind(this);
    this.SelSwitchMapChange = this.SelSwitchMapChange.bind(this);
    this.SelSwitchMapChangeSuite = this.SelSwitchMapChangeSuite.bind(this);
    this.validate = this.validate.bind(this);
    this.close = this.close.bind(this);
    this.ClicSeats = this.ClicSeats.bind(this);
    this.ClicFreePlace = this.ClicFreePlace.bind(this);
    this.AffectValidation = this.AffectValidation.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.onchange = this.onchange.bind(this);
  }
  _handleChange(e) {
    let { value } = e.target;
    if(value==="visioRoom" || value==="meetingRoom"){
      document.getElementById("divName").classList.remove('hidden');
    }else{
      document.getElementById("divName").classList.add('hidden');      
    }
    this.setState({
      typeElement: value === "collaborateur" ? "freePlace" : value,
      seat: {
        uid: this.state.selectedMap,
        coords: this.state.seat.coords,
        name: document.getElementById("inputName").value,
        type: value,
        picture: "http://localhost:3000/picture/" + value + ".JPG"
      }
    });
  }
  componentDidMount() {
    var tab = this.state.maps.filter(function(map) {
      return map.uid === this.state.selectedMap;
    }, this);
    this.SelSwitchMapChangeSuite(tab[0]);
    this.pan.fitToViewer();
  }
  close() {
    this.setState({
      modal: false,
      modalAffect: false
    });
  }
  toggle(mouse) {
    this.setState({
      modal: !this.state.modal,
      seat: { coords: [mouse[0], mouse[1]], type: this.state.typeElement },
      map_container: d3.select("#map-container")
    });
  }
  AffectValidation() {
    alert("ok");
    this.close();
  }
  validate() {
    this.SwitchElementsType(this.state.seat, this.state.map_container, false);
    this.close();
  }
  _click(e) {
    e = e.originalEvent;

    let mouse = d3.clientPoint(e.target, e);

    this.toggle(mouse);
  }
  renderSeat(seat) {
    //const { search } = this.state;
    //var code = seat.name.toLowerCase();

    return (
      <ListGroupItem
        className="listGroup"
        hover
        uid={seat.uid}
        name={seat.name}
        cords={seat.coords}
        type={seat.type}
        onClick={e => this.ClicSeats(seat, e)}
      >
        {seat.name.substring(0, 15)}
        {seat.name.length > 15 && "..."}
        
      </ListGroupItem>
    );
  }
  ClicFreePlace() {
    this.setState({
      modalAffect: !this.state.modal
    });
    d3.event.stopPropagation();
  }
  ClicSeats(seat, e) {
    console.log(e);
    let type = seat.type ? seat.type : seat.target.type;
    switch (type) {
      case "freePlace":
        this.setState({
          modalAffect: !this.state.modal
        });
       d3.event?d3.event.stopPropagation():"";
        //if (typeof d3 !== "undefined") d3.event.stopPropagation();

        break;
      default:
        let name = seat.name ? seat.name : seat.target.name;
        this.setState({
          selectedplace: seat
        });
        //document.getElementsByClassName("d-inline-block")[0].setAttribute("class", "active");
        //e.target.setAttribute("class", "active");
        document
          .getElementById("listGroupe")
          .getElementsByClassName("active")[0]
          ? document
              .getElementById("listGroupe")
              .getElementsByClassName("active")[0]
              .classList.remove("active")
          : "";
        //e.target?e.target.classList.add("active"):"";
        document.getElementsByName(name)[0].classList.add("active");
        //document.getElementsByClassName("d-inline-block")[0] ? document.getElementsByClassName("d-inline-block")[0].innerHTML = "<div className='row'><div><img class='picture' src=" + seat.picture + "></div><div>" + name + "</div></div>" : "";
        document.getElementsByName("pointer")[0]
          ? document.getElementsByName("pointer")[0].remove()
          : "";
        let seatx = seat.coords[0] + 10;
        //var pointer = 
        d3
          .select("#map-container")
          .append("use")
          .attr("href", "#pointer")
          .attr("name", "pointer")
          .attr(
            "transform",
            "translate(" + seatx + "," + seat.coords[1] + ")scale(0)"
          )
          .attr("fill", "#039BE5")
          .attr("stroke", "#039BE5")
          .attr("stroke-width", "1px")
          .transition()
          .duration(500)
          .attr("x", seatx)
          .attr("y", seat.coords[1])
          .attr("transform", "scale(1)");

        d3.event ? d3.event.stopPropagation() : "";
        
        
        this.pan.setPointOnViewerCenter(seatx, seat.coords[1], 1.5);
        break;
    }
  }
  onchange(e) {
    this.setState({ search: e.target.value });
  }
  SwitchElementsType(seat, map_container, oldElem) {
    let node;
    switch (seat.type) {
      case "Infirmerie":
        node = map_container
          .append("use")
          .attr("href", "#hos")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          )
          .attr("width", 20)
          .attr("height", 20);
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);

        node.on("click", function() {
          console.log("jjj");

          d3.event.stopPropagation();
        });
        node.on("click", () => this.ClicSeats(seat, this));

        //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Infirmerie').attr('fill', 'black');

        break;
      case "WC":
        node = map_container
          .append("use")
          .attr("href", "#WC")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          );
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);
        node.on("click", () => this.ClicSeats(seat, this));
        //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('WC').attr('fill', 'black');

        break;

      case "meetingRoom":
        node = map_container
          .append("use")
          .attr("href", "#meetingRoom")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          );
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);
        node.on("click", () => this.ClicSeats(seat, this));
        //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.15em').text('Meeting Room').attr('fill', 'black');

        break;
      case "visioRoom":
        node = map_container
          .append("use")
          .attr("href", "#visioRoom")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          );
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);
        node.on("click", () => this.ClicSeats(seat, this));
        //d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Visio Room').attr('fill', 'black');

        break;
      case "escal":
        node = map_container
          .append("use")
          .attr("href", "#Escalier")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          );
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);
        node.on("click", () => this.ClicSeats(seat, this));
        //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Escalier').attr('fill', 'black');
        break;

      case "ascenseur":
        node = map_container
          .append("use")
          .attr("href", "#ascenseur")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          );
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);
        node.on("click", () => this.ClicSeats(seat, this));
        //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Ascenseur').attr('fill', 'black');
        break;

      case "collaborateur":
        node = map_container
          .append("use")
          .attr("href", "#user")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          );
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);
        node.on("click", () => this.ClicSeats(seat, this));
        break;

      case "freePlace":
        node = map_container
          .append("use")
          .attr("href", "#freePlace")
          .attr(
            "transform",
            "translate(" + seat.coords[0] + "," + seat.coords[1] + ")"
          );
        oldElem ? "" : this.state.seats[this.state.selectedMap].push(seat);
        this.setState(this.state);
        node.on("click", () => this.ClicSeats(seat, this));
        //text = d3.select(node.node().parentNode).append('text').attr('x', seat.coords[0]).attr('y', seat.coords[1]).attr('dy', '-.25em').text('Collaborateur').attr('fill', 'black');
        break;
        default : break;
    }
  }
  SelSwitchMapChangeSuite(tab) {
    var svg = d3.select(this.node).call(
      d3.zoom().on("zoom", function() {
        svg.attr("transform", d3.event.transform);
      })
    );
    document.getElementById("map-container").innerHTML = "";

    //charger à partir d'un URL
    fetch(tab.url)
      .then(response => response.text())
      .then(res => {
        //let svg = d3.select(this.node);
        document
          .getElementById("map-container")
          .insertAdjacentHTML("afterbegin", res);
        //this.node.insertAdjacentHTML("afterbegin", res);
      });

    // add Seats
    let sm = tab.uid;
    this.state.selectedMap=sm;
    //this.setState({ selectedMap: sm})
    //this.state.selectedMap = selectedMap;
    //let tabSeats = this.state.seats[selectedMap];
    var map_container = d3.select("#map-container");
    
    this.state.seats[tab.uid]
      ? this.state.seats[tab.uid].map(function(seat) {
          return this.SwitchElementsType(seat, map_container, true);
        }, this)
      : "";
  }
  SelSwitchMapChange(elm) {
    var tab = this.state.maps.filter(function(map) {
      return map.uid === elm.target.value;
    });
    this.SelSwitchMapChangeSuite(tab[0]);
  }

  render() {
    const divBrowser = { overflow: "hidden", border: "1px solid #222222" };

    const { search } = this.state;

    const filteredCountries = this.state.seats[this.state.selectedMap]
      ? this.state.seats[this.state.selectedMap].filter(seat => {
          return seat.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
      : "";

    return <div className="flyout">
        <Container>
          <main style={{ marginTop: "1rem" }}>
            <div className="row">
              <div className="col" />
              <div className="col">
                <Input hint="Vous cherchez..." icon="search" onChange={e => {
                    this.onchange(e);
                  }} />
              </div>
              <div className="col" />
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-2" style={{ height: "410px" }}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Selectionnez un étage :{" "}
                      </label>
                      <select id="switchMaps" className="form-control form-control-sm" onChange={this.SelSwitchMapChange.bind(this)}>
                        {this.state.maps.map(function(item) {
                          return <option value={item.uid}>
                              {item.title}
                            </option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="profile-sidebar">
                      <div className="profile-userpic">
                        <img src={this.state.selectedplace.picture} className="img-responsive" alt="" />
                      </div>
                      <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                          {this.state.selectedplace.name}
                        </div>
                        <div className="profile-usertitle-job">
                          {this.state.selectedplace.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div style={{ width: "100%", height: "100%" }}>
                  <AutoSizer>
                    {({ width, height }) => <ReactSVGPanZoom width={825} height={500} detectAutoPan={false} toolbarPosition="top" onClick={event => this._click(event)} ref={pan => (this.pan = pan)}>
                        <svg style={divBrowser} ref={node => (this.node = node)} width={825} height={500}>
                          <defs>
                            <g id="hos" transform="scale(0.05)">
                              <path style={{fill:"#303C42"}} d="M469.333,106.667H384V85.333c0-23.531-19.146-42.667-42.667-42.667H170.667
	C147.146,42.667,128,61.802,128,85.333v21.333H42.667C19.146,106.667,0,125.802,0,149.333v277.333
	c0,23.531,19.146,42.667,42.667,42.667h426.667c23.521,0,42.667-19.135,42.667-42.667V149.333
	C512,125.802,492.854,106.667,469.333,106.667z M362.667,106.667H149.333V85.333c0-11.76,9.563-21.333,21.333-21.333h170.667
	c11.771,0,21.333,9.573,21.333,21.333V106.667z"/>
<path style={{fill:"#D32F2F"}} d="M42.667,128h426.667c11.771,0,21.333,9.573,21.333,21.333v64h-64v-10.667
	c0-5.896-4.771-10.667-10.667-10.667c-5.896,0-10.667,4.771-10.667,10.667v10.667H106.667v-10.667
	c0-5.896-4.771-10.667-10.667-10.667c-5.896,0-10.667,4.771-10.667,10.667v10.667h-64v-64C21.333,137.573,30.896,128,42.667,128z"/>
<path style={{fill:"#FAFAFA"}} d="M469.333,448H42.667c-11.771,0-21.333-9.573-21.333-21.333v-192h64v32
	c0,5.896,4.771,10.667,10.667,10.667c5.896,0,10.667-4.771,10.667-10.667v-32h298.667v32c0,5.896,4.771,10.667,10.667,10.667
	c5.896,0,10.667-4.771,10.667-10.667v-32h64v192C490.667,438.427,481.104,448,469.333,448z"/>
<path style={{opacity:0.1,enableBackground:"new"}} d="M490.667,213.333v-64c0-11.76-9.563-21.333-21.333-21.333h-10.667v85.333
	H490.667z"/>
<path style={{opacity:0.1,enableBackground:"new"}} d="M394.667,426.667H21.333c0,11.76,9.563,21.333,21.333,21.333h426.667
	c11.771,0,21.333-9.573,21.333-21.333v-192h-32v128C458.667,398.013,430.013,426.667,394.667,426.667z"/>
<path style={{fill:"#303C42"}} d="M330.667,309.333H288v-42.667c0-5.896-4.771-10.667-10.667-10.667h-42.667
	c-5.896,0-10.667,4.771-10.667,10.667v42.667h-42.667c-5.896,0-10.667,4.771-10.667,10.667v42.667
	c0,5.896,4.771,10.667,10.667,10.667H224V416c0,5.896,4.771,10.667,10.667,10.667h42.667c5.896,0,10.667-4.771,10.667-10.667
	v-42.667h42.667c5.896,0,10.667-4.771,10.667-10.667V320C341.333,314.104,336.563,309.333,330.667,309.333z"/>
<path style={{fill:"#D32F2F"}} d="M320,352h-42.667c-5.896,0-10.667,4.771-10.667,10.667v42.667h-21.333v-42.667
	c0-5.896-4.771-10.667-10.667-10.667H192v-21.333h42.667c5.896,0,10.667-4.771,10.667-10.667v-42.667h21.333V320
	c0,5.896,4.771,10.667,10.667,10.667H320V352z"/>
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-47.1806" y1="638.9036" x2="-22.1482" y2="627.2314" gradientTransform="matrix(21.3333 0 0 -21.3333 996.3334 13791.667)">
	<stop  offset="0" style={{stopColor:"#FFFFFF",stopOpacity:0.2}}/>
	<stop  offset="1" style={{stopColor:"#FFFFFF",stopOpacity:0}}/>
</linearGradient>
<path style={{fill:"url(#SVGID_1_)"}} d="M469.333,106.667H384V85.333c0-23.531-19.146-42.667-42.667-42.667H170.667
	C147.146,42.667,128,61.802,128,85.333v21.333H42.667C19.146,106.667,0,125.802,0,149.333v277.333
	c0,23.531,19.146,42.667,42.667,42.667h426.667c23.521,0,42.667-19.135,42.667-42.667V149.333
	C512,125.802,492.854,106.667,469.333,106.667z M362.667,106.667H149.333V85.333c0-11.76,9.563-21.333,21.333-21.333h170.667
	c11.771,0,21.333,9.573,21.333,21.333V106.667z"/>
                            </g>
                            <g id="visioRoom" transform="scale(0.05)">
                              <g>
                                <g>
                                  <g>
                                    <circle style={{ fill: " #D4E1F4" }} cx="235.102" cy="349.518" r="32.914" />
                                    <path style={{ fill: " #D4E1F4" }} d="M294.139,459.233H176.065c0-32.605,26.432-59.037,59.037-59.037S294.139,426.628,294.139,459.233
				L294.139,459.233z" />
                                    <circle style={{ fill: " #D4E1F4" }} cx="73.665" cy="349.518" r="32.914" />
                                    <path style={{ fill: " #D4E1F4" }} d="M133.747,459.233H15.673c0-32.605,26.432-59.037,59.037-59.037S133.747,426.628,133.747,459.233
				L133.747,459.233z" />
                                    <circle style={{ fill: " #D4E1F4" }} cx="397.061" cy="349.518" r="32.914" />
                                    <path style={{ fill: " #D4E1F4" }} d="M454.531,459.233H336.457c0.013-32.605,26.455-59.026,59.06-59.014
				C428.104,400.232,454.518,426.646,454.531,459.233z" />
                                  </g>
                                  <path style={{ fill: " #00ACEA" }} d="M169.796,241.371h208.98V48.065H91.429v193.306H169.796z M415.347,42.318v203.755
			c0,17.312-14.035,31.347-31.347,31.347H86.204c-17.312,0-31.347-14.034-31.347-31.347V42.318
			c0-17.312,14.034-31.347,31.347-31.347H384C401.312,10.971,415.347,25.006,415.347,42.318z" />
                                  <path style={{ fill: " #D4E1F4" }} d="M378.776,48.065v193.306h-78.367c0-36.068-29.239-65.306-65.306-65.306
			s-65.306,29.239-65.306,65.306H91.429V48.065L378.776,48.065z M271.673,119.641c0-20.198-16.374-36.571-36.571-36.571
			c-20.198,0-36.571,16.374-36.571,36.571s16.374,36.571,36.571,36.571S271.673,139.839,271.673,119.641L271.673,119.641z" />
                                  <g>
                                    <path style={{ fill: " #00EFD1" }} d="M300.408,241.371H169.796c0-36.068,29.239-65.306,65.306-65.306S300.408,205.304,300.408,241.371z
				" />
                                    <circle style={{ fill: " #00EFD1" }} cx="235.102" cy="119.641" r="36.571" />
                                  </g>
                                </g>
                                <g>
                                  <path style={{ fill: " #083863" }} d="M73.665,392.359c-23.746,0.002-43.077-19.096-43.363-42.841c0-23.949,19.414-43.363,43.363-43.363
			s43.363,19.414,43.363,43.363C116.742,373.263,97.412,392.361,73.665,392.359z M73.665,326.531
			c-12.491,0.284-22.469,10.493-22.465,22.988c0,12.407,10.058,22.465,22.465,22.465s22.465-10.058,22.465-22.465
			C96.134,337.024,86.157,326.815,73.665,326.531z" />
                                  <path style={{ fill: " #083863" }} d="M133.747,470.204H15.673c-5.771,0-10.449-4.678-10.449-10.449c0-38.376,31.11-69.486,69.486-69.486
			s69.486,31.11,69.486,69.486C144.196,465.526,139.518,470.204,133.747,470.204z M27.167,449.306h95.086
			c-4.878-22.406-24.613-38.454-47.543-38.661C51.78,410.852,32.045,426.9,27.167,449.306z" />
                                  <path style={{ fill: " #083863" }} d="M235.102,392.359c-23.746,0.002-43.077-19.096-43.363-42.841c0-23.949,19.414-43.363,43.363-43.363
			s43.363,19.414,43.363,43.363C278.179,373.263,258.848,392.361,235.102,392.359z M235.102,326.531
			c-12.491,0.284-22.469,10.493-22.465,22.988c0,12.407,10.058,22.465,22.465,22.465c12.407,0,22.465-10.058,22.465-22.465
			C257.571,337.024,247.593,326.815,235.102,326.531z" />
                                  <path style={{ fill: " #083863" }} d="M294.139,470.204H176.065c-5.771,0-10.449-4.678-10.449-10.449
			c0-38.376,31.11-69.486,69.486-69.486s69.486,31.11,69.486,69.486l0,0C304.588,465.526,299.91,470.204,294.139,470.204
			L294.139,470.204z M187.559,449.306h95.086c-5.535-26.257-31.308-43.056-57.565-37.521
			C206.245,415.756,191.53,430.471,187.559,449.306L187.559,449.306z" />
                                  <path style={{ fill: " #083863" }} d="M397.061,392.359c-23.746,0.002-43.077-19.096-43.363-42.841
			c-0.01-23.949,19.396-43.371,43.345-43.381c23.949-0.01,43.371,19.396,43.381,43.345c0,0.012,0,0.024,0,0.036
			C440.138,373.263,420.807,392.361,397.061,392.359z M397.061,326.531c-12.491,0.284-22.469,10.493-22.465,22.988
			c0.008,12.407,10.073,22.459,22.48,22.45c12.396-0.008,22.442-10.055,22.45-22.45C419.53,337.024,409.553,326.815,397.061,326.531
			z" />
                                  <path style={{ fill: " #083863" }} d="M454.531,470.204H336.457c-5.771,0-10.449-4.678-10.449-10.449
			c-0.013-38.376,31.087-69.496,69.463-69.509c38.376-0.013,69.496,31.087,69.509,69.463c0,0.015,0,0.031,0,0.046
			C464.98,465.526,460.301,470.204,454.531,470.204z M347.951,449.306h95.086c-5.535-26.257-31.308-43.056-57.565-37.521
			C366.637,415.756,351.922,430.471,347.951,449.306L347.951,449.306z" />
                                  <path style={{ fill: " #083863" }} d="M235.102,167.184c-25.969,0-47.02-21.052-47.02-47.02s21.052-47.02,47.02-47.02
			s47.02,21.052,47.02,47.02S261.071,167.184,235.102,167.184z M235.102,94.041c-14.427,0-26.122,11.695-26.122,26.122
			s11.695,26.122,26.122,26.122s26.122-11.695,26.122-26.122S249.529,94.041,235.102,94.041z" />
                                  <path style={{ fill: " #083863" }} d="M386.612,47.02c0-5.771-4.678-10.449-10.449-10.449H88.816c-5.771,0-10.449,4.678-10.449,10.449
			v193.306c0,5.771,4.678,10.449,10.449,10.449h287.347c5.771,0,10.449-4.678,10.449-10.449V47.02z M181.29,229.878
			c5.885-29.72,34.748-49.041,64.468-43.156c21.799,4.317,38.84,21.358,43.156,43.156H181.29z M365.714,229.878h-55.902
			c-6.925-41.261-45.988-69.096-87.249-62.171c-31.86,5.347-56.824,30.311-62.171,62.171H99.265V57.469h266.449V229.878z" />
                                  <path style={{ fill: " #083863" }} d="M384,287.347H86.204c-23.083,0-41.796-18.713-41.796-41.796V41.796
			C44.408,18.713,63.121,0,86.204,0H384c23.083,0,41.796,18.713,41.796,41.796v203.755C425.796,268.634,407.083,287.347,384,287.347
			z M86.204,20.898c-11.542,0-20.898,9.356-20.898,20.898v203.755c-0.292,11.249,8.59,20.606,19.839,20.898
			c0.353,0.009,0.706,0.009,1.059,0H384c11.249,0.292,20.606-8.59,20.898-19.839c0.009-0.353,0.009-0.706,0-1.059V41.796
			c0-11.542-9.356-20.898-20.898-20.898H86.204z" />
                                </g>
                              </g>
                            </g>
                            <g id="meetingRoom" transform="scale(0.05)">
                              <path style={{ fill: "#F2BB80" }} d="M136.589,149.248l17.045,59.659h-17.045c0,23.531-19.082,42.613-42.613,42.613l0,0
	c-23.531,0-42.613-19.082-42.613-42.613v-59.659c0-14.122,11.446-25.568,25.568-25.568h34.091
	C125.143,123.68,136.589,135.126,136.589,149.248z" />
                              <path style={{ fill: "#4398D1" }} d="M332.61,4.363H179.202c-14.122,0-25.568,11.446-25.568,25.568v51.136
	c0,14.122,11.446,25.568,25.568,25.568l0,0v25.568l42.613-25.568H332.61c14.122,0,25.568-11.446,25.568-25.568V29.931
	C358.178,15.809,346.733,4.363,332.61,4.363z" />
                              <path style={{ fill: "#87CED9" }} d="M468.973,362.315H366.701v-76.704c0-18.827,15.264-34.091,34.091-34.091h34.091
	c18.827,0,34.091,15.264,34.091,34.091V362.315z" />
                              <path style={{ fill: "#4398D1" }} d="M42.839,362.315h102.272v-76.704c0-18.827-15.264-34.091-34.091-34.091H76.93
	c-18.827,0-34.091,15.264-34.091,34.091C42.839,285.611,42.839,362.315,42.839,362.315z" />
                              <circle style={{ fill: "#6B402A" }} cx="102.532" cy="183.339" r="8.523" />
                              <path style={{ fill: "#126099" }} d="M42.839,362.315L42.839,362.315c0,23.531,19.082,42.613,42.613,42.613h59.659v102.272h59.659
	l-17.045-25.568v-85.227c0-18.827-15.264-34.091-34.091-34.091H42.839z" />
                              <path style={{ fill: "#D1D1D1" }} d="M113.748,490.582l-45.341-15.085V439.02H51.362v36.477L6.021,490.582
	c-4.585,1.508-7.091,6.452-5.582,11.037c1.509,4.585,6.452,7.091,11.037,5.582l48.409-16.619l48.409,16.619
	c0.903,0.119,1.824,0.119,2.727,0c3.665,0.009,6.92-2.327,8.097-5.795c1.517-4.457-0.869-9.298-5.327-10.807
	C113.782,490.59,113.765,490.582,113.748,490.582z" />
                              <rect x="85.487" y="251.521" style={{ fill: "#126099" }} width="17.045" height="85.227" />
                              <path style={{ fill: "#6B402A" }} d="M111.021,157.771H76.93l-25.568,34.091v-42.613c0-14.122,11.446-25.568,25.568-25.568h68.181
	C145.111,142.507,129.856,157.771,111.021,157.771z" />
                              <path style={{ fill: "#F2BB80" }} d="M375.224,149.248l-17.045,59.659h17.045c0,23.531,19.082,42.613,42.613,42.613l0,0
	c23.531,0,42.613-19.082,42.613-42.613v-59.659H375.224z" />
                              <path style={{ fill: "#6B402A" }} d="M460.451,149.248L460.451,149.248c0-14.122-11.446-25.568-25.568-25.568h-63.92
	c-7.057,0-12.784,5.727-12.784,12.784s5.727,12.784,12.784,12.784h55.397l34.091,42.613V149.248z" />
                              <g>
                                <rect x="179.236" y="29.931" style={{ fill: "#3582BD" }} width="153.408" height="17.045" />
                                <rect x="179.236" y="64.022" style={{ fill: "#3582BD" }} width="34.091" height="17.045" />
                                <rect x="230.372" y="64.022" style={{ fill: "#3582BD" }} width="102.272" height="17.045" />
                              </g>
                              <path style={{ fill: "#87CED9" }} d="M307.042,106.635c14.122,0,25.568,11.446,25.568,25.568v17.045c0,14.122-11.446,25.568-25.568,25.568
	h-17.045v25.568l-42.613-25.568h-25.568c-14.122,0-25.568-11.446-25.568-25.568v-17.045c0-14.122,11.446-25.568,25.568-25.568
	C221.816,106.635,307.042,106.635,307.042,106.635z" />
                              <rect x="145.146" y="319.702" style={{ fill: "#6B402A" }} width="221.59" height="25.568" />
                              <path style={{ fill: "#D1D1D1" }} d="M505.791,490.582l-45.341-15.085V439.02h-17.045v36.477l-45.341,15.085
	c-4.474,1.508-6.878,6.349-5.369,10.824c1.508,4.474,6.349,6.878,10.824,5.369l48.409-16.193l48.409,16.619
	c0.903,0.119,1.824,0.119,2.727,0c3.818,0.196,7.304-2.173,8.523-5.795c1.449-4.483-1.006-9.281-5.489-10.73
	C506.004,490.642,505.902,490.607,505.791,490.582z" />
                              <rect x="409.349" y="251.521" style={{ fill: "#4398D1" }} width="17.045" height="85.227" />
                              <g>
                                <path style={{ fill: "#6B402A" }} d="M42.839,404.929h51.136c9.418,0,17.045,7.628,17.045,17.045l0,0c0,9.418-7.628,17.045-17.045,17.045
		H34.317c-14.122,0-25.568-11.446-25.568-25.568V294.134c0-9.418,7.628-17.045,17.045-17.045l0,0
		c9.418,0,17.045,7.628,17.045,17.045V404.929z" />
                                <path style={{ fill: "#6B402A" }} d="M468.973,404.929h-51.136c-9.418,0-17.045,7.628-17.045,17.045l0,0
		c0,9.418,7.628,17.045,17.045,17.045h59.659c14.122,0,25.568-11.446,25.568-25.568V294.134c0-9.418-7.628-17.045-17.045-17.045l0,0
		c-9.418,0-17.045,7.628-17.045,17.045V404.929z" />
                              </g>
                              <path style={{ fill: "#D1D1D1" }} d="M221.816,319.702h-76.704v-17.045h70.823l23.437-62.642l16.023,5.966l-25.568,68.181
	C228.583,317.503,225.387,319.711,221.816,319.702z" />
                              <path style={{ fill: "#126099" }} d="M468.973,362.315L468.973,362.315c0,23.531-19.082,42.613-42.613,42.613h-59.659v102.272h-59.659
	l17.045-25.568v-85.227c0-18.827,15.264-34.091,34.091-34.091H468.973z" />
                              <polygon style={{ fill: "#D1D1D1" }} points="264.429,490.156 264.429,345.27 247.384,345.27 247.384,490.156 204.77,490.156 
	204.77,507.201 307.042,507.201 307.042,490.156 " />
                              <g>
                                <rect x="221.85" y="132.203" style={{ fill: "#539FBD" }} width="51.136" height="17.045" />
                                <rect x="290.031" y="132.203" style={{ fill: "#539FBD" }} width="17.045" height="17.045" />
                              </g>
                              <circle style={{ fill: "#6B402A" }} cx="400.826" cy="183.339" r="8.523" />
                            </g>
                            <g id="WC" transform="scale(0.05)">
                              <path style={{ fill: " #303C42" }} d="M469.333,64H42.667C19.135,64,0,83.135,0,106.667v298.667C0,428.865,19.135,448,42.667,448h426.667
	C492.865,448,512,428.865,512,405.333V106.667C512,83.135,492.865,64,469.333,64z" />
                              <path style={{ fill: " #DFE1DF" }} d="M490.667,405.333c0,11.76-9.573,21.333-21.333,21.333H42.667c-11.76,0-21.333-9.573-21.333-21.333
	V106.667c0-11.76,9.573-21.333,21.333-21.333h426.667c11.76,0,21.333,9.573,21.333,21.333V405.333z" />
                              <path style={{ opacity: "0.1", enableBackground: "new" }} d="M469.333,85.333h-10.667v232.391c0,42.493-34.448,76.943-76.943,76.943
	H21.333v10.667c0,11.76,9.563,21.333,21.333,21.333h426.667c11.771,0,21.333-9.573,21.333-21.333V106.667
	C490.667,94.906,481.104,85.333,469.333,85.333z" />
                              <path style={{ fill: " #303C42" }} d="M384,213.333c5.885,0,10.667,4.781,10.667,10.667c0,5.896,4.771,10.667,10.667,10.667H448
	c5.896,0,10.667-4.771,10.667-10.667c0-41.167-33.5-74.667-74.667-74.667s-74.667,33.5-74.667,74.667v64
	c0,41.167,33.5,74.667,74.667,74.667s74.667-33.5,74.667-74.667c0-5.896-4.771-10.667-10.667-10.667h-42.667
	c-5.896,0-10.667,4.771-10.667,10.667c0,5.885-4.781,10.667-10.667,10.667c-5.885,0-10.667-4.781-10.667-10.667v-64
	C373.333,218.115,378.115,213.333,384,213.333z" />
                              <path style={{ fill: " #1E88E5" }} d="M384,320c13.906,0,25.771-8.917,30.177-21.333h22.083c-4.958,24.313-26.5,42.667-52.26,42.667
	c-29.406,0-53.333-23.927-53.333-53.333v-64c0-29.406,23.927-53.333,53.333-53.333c25.76,0,47.302,18.354,52.26,42.667h-22.083
	C409.771,200.917,397.906,192,384,192c-17.646,0-32,14.354-32,32v64C352,305.646,366.354,320,384,320z" />
                              <path style={{ fill: " #303C42" }} d="M277.333,149.333h-42.667c-5.896,0-10.667,4.771-10.667,10.667v104.146l-10.667,21.333
	l-10.667-21.333v-82.813c0-5.896-4.771-10.667-10.667-10.667h-42.667c-5.896,0-10.667,4.771-10.667,10.667v82.813L128,285.479
	l-10.667-21.333V160c0-5.896-4.771-10.667-10.667-10.667H64c-5.896,0-10.667,4.771-10.667,10.667v117.333
	c0,1.854,0.49,3.677,1.406,5.292l42.667,74.667c1.896,3.323,5.438,5.375,9.26,5.375h42.667c4.042,0,7.729-2.281,9.542-5.896
	l11.792-23.583l11.792,23.583c1.813,3.615,5.5,5.896,9.542,5.896h42.667c3.823,0,7.365-2.052,9.26-5.375l42.667-74.667
	c0.917-1.615,1.406-3.438,1.406-5.292V160C288,154.104,283.229,149.333,277.333,149.333z" />
                              <path style={{ fill: " #1E88E5" }} d="M266.667,274.5l-38.188,66.833h-29.885l-18.385-36.771c-3.625-7.229-15.458-7.229-19.083,0
	l-18.385,36.771h-29.885L74.667,274.5V170.667H96v96c0,1.656,0.385,3.292,1.125,4.771l21.333,42.667
	c3.625,7.229,15.458,7.229,19.083,0l21.333-42.667c0.74-1.479,1.125-3.115,1.125-4.771V192h21.333v74.667
	c0,1.656,0.385,3.292,1.125,4.771l21.333,42.667c3.625,7.229,15.458,7.229,19.083,0l21.333-42.667
	c0.74-1.479,1.125-3.115,1.125-4.771v-96h21.333V274.5z" />
                              <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-47.4108" y1="640.4102" x2="-21.9955" y2="628.5585" gradientTransform="matrix(21.3333 0 0 -21.3333 996.3334 13791.667)">
                                <stop offset="0" style={{stopColor:"#FFFFFF",stopOpacity:0.2}} />
                                <stop offset="1" style={{stopColor:"#FFFFFF",stopOpacity:0}} />
                              </linearGradient>
                              <path style={{ fill: "url(#SVGID_1_)" }} d="M469.333,64H42.667C19.135,64,0,83.135,0,106.667v298.667C0,428.865,19.135,448,42.667,448
	h426.667C492.865,448,512,428.865,512,405.333V106.667C512,83.135,492.865,64,469.333,64z" />
                            </g>
                            <g id="Escalier" transform="scale(0.04)">
                              <path style={{ fill: "#5F6E9B" }} d="M176.183,109.66l-48.504-11.175c-15.022-3.461-30.005,5.91-33.465,20.932l-30.424,132.05
	c-1.143,4.96-1.405,10.082-0.775,15.134l13.839,110.89L66.288,478.362c-1.255,11.977,7.438,22.704,19.415,23.958
	c11.966,1.254,22.702-7.43,23.958-19.415l10.843-103.514c0.184-1.756,0.154-3.529-0.09-5.277L107.16,269.356l57.803,13.318
	l32.152-139.549C200.576,128.104,191.205,113.121,176.183,109.66z" />
                              <path style={{ fill: "#FFB69E" }} d="M7.471,233.619c-8.263-6.214-9.925-17.949-3.713-26.212l46.015-61.202
	c2.397-3.188,5.748-5.526,9.568-6.676l77.9-23.445c9.9-2.98,20.34,2.631,23.32,12.53c2.98,9.9-2.631,20.341-12.53,23.32
	L76.01,173.61l-42.326,56.296C27.491,238.142,15.763,239.851,7.471,233.619z" />
                              <path style={{ fill: "#414B82" }} d="M160.796,456.952c-11.795-2.427-19.391-13.956-16.965-25.751l19.813-96.312l-66.39-77.983
	c-7.807-9.17-6.702-22.932,2.468-30.738c9.171-7.807,22.932-6.701,30.738,2.468l73.289,86.088c4.354,5.114,6.109,11.95,4.755,18.528
	l-21.956,106.736C184.129,451.746,172.629,459.385,160.796,456.952z" />
                              <path style={{ fill: "#64AFFF" }} d="M176.183,109.66c-16.164-3.725-32.339-7.452-48.504-11.175c-15.022-3.461-30.005,5.911-33.465,20.932
	c-5.147,22.34-22.176,96.251-30.425,132.051c-0.58,2.52-0.931,5.081-1.056,7.653c9.935,2.289,92.11,21.223,102.23,23.554
	c33.001-143.292,32.257-139.907,32.472-141.17C199.889,127.04,190.664,112.996,176.183,109.66z" />
                              <circle style={{ fill: "#FFB69E" }} cx="171.534" cy="50.88" r="41.321" />
                              <path style={{ fill: "#A5C8CD" }} d="M422.492,322.268c-3.017,0-5.463,2.446-5.463,5.463v39.58h-89.507c-3.017,0-5.463,2.446-5.463,5.463
	v39.58h-89.507c-3.017,0-5.463,2.446-5.463,5.463v39.58h-89.507c-3.017,0-5.463,2.446-5.463,5.463v34.117
	c0,3.017,2.446,5.463,5.463,5.463h368.954c3.017,0,5.463-2.446,5.463-5.463V327.731c0-3.017-2.446-5.463-5.463-5.463
	L422.492,322.268L422.492,322.268z" />
                              <path style={{ fill: "#55879B" }} d="M26.41,502.441c-9.101,0-16.48-7.378-16.48-16.48v-118.65c0-6.037,3.302-11.592,8.605-14.476
	L487.645,97.654c5.105-2.776,11.299-2.661,16.295,0.31c4.998,2.97,8.06,8.353,8.06,14.165v237.603c0,9.101-7.378,16.48-16.48,16.48
	c-9.101,0-16.48-7.378-16.48-16.48V139.854L42.89,377.106v108.856C42.89,495.062,35.512,502.441,26.41,502.441z" />
                              <path style={{ fill: "#FFB69E" }} d="M256.77,242.964l-74.311-8.455c-6.23-0.709-11.689-4.488-14.547-10.068l-41.55-81.148
	c-4.712-9.203-1.071-20.482,8.131-25.194c9.2-4.717,20.482-1.071,25.194,8.131l36.976,72.215l64.338,7.321
	c10.273,1.169,17.653,10.444,16.484,20.715C276.318,236.74,267.05,244.135,256.77,242.964z" />
                              <path style={{ fill: "#78BEFF" }} d="M179.969,165.838l-20.281-39.609c-4.712-9.203-15.994-12.849-25.194-8.131
	c-9.203,4.712-12.844,15.992-8.131,25.194l19.781,38.633L179.969,165.838z" />
                            </g>
                            <g id="ascenseur" transform="scale(0.3)">
                              <rect x="0.5" style={{ fill: " #546A79" }} width="58" height="58" />
                              <rect x="10.5" y="9" style={{ fill: " #BDC3C7", stroke: "#ECF0F1", strokeWidth: "2", strokeMiterlimit: "10" }} width="38" height="49" />
                              <rect x="51.5" y="26" style={{ fill: " #ECF0F1" }} width="4" height="14" />
                              <g>
                                <line style={{ fill: " #546A79" }} x1="51.5" y1="33" x2="55.5" y2="33" />
                                <rect x="51.5" y="32" style={{ fill: " #546A79" }} width="4" height="2" />
                              </g>
                              <line style={{ fill: " none", stroke: "#ECF0F1", strokWidth: "2", strokeMiterlimit: "10" }} x1="29.5" y1="9" x2="29.5" y2="58" />
                              <rect x="21.5" y="2" style={{ fill: " #F0C419" }} width="16" height="4" />
                            </g>
                            <g id="user" transform="scale(0.20)">
                              <path style={{ fill: "#3083C9" }} d="M39.566,45.283l-9.552-4.776C28.78,39.89,28,38.628,28,37.248V33.5
                                                      c0.268-0.305,0.576-0.698,0.904-1.162c1.302-1.838,2.286-3.861,2.969-5.984C33.098,25.977,34,24.845,34,23.5v-4
                                                      c0-0.88-0.391-1.667-1-2.217V11.5c0,0,1.187-9-11-9c-12.188,0-11,9-11,9v5.783c-0.609,0.55-1,1.337-1,2.217v4
                                                      c0,1.054,0.554,1.981,1.383,2.517C12.382,30.369,15,33.5,15,33.5v3.655c0,1.333-0.728,2.56-1.899,3.198L4.18,45.22
                                                      C1.603,46.625,0,49.326,0,52.261V55.5h44v-3.043C44,49.419,42.283,46.642,39.566,45.283z" />
                              <path style={{ fill: "#CB465F" }} d="M54.07,46.444l-9.774-4.233c-0.535-0.267-0.971-0.836-1.277-1.453
                                                      c-0.277-0.557,0.136-1.212,0.758-1.212h6.883c0,0,2.524,0.242,4.471-0.594c1.14-0.49,1.533-1.921,0.82-2.936
                                                      c-2.085-2.969-6.396-9.958-6.535-17.177c0,0-0.239-11.112-11.202-11.202c-2.187,0.018-3.97,0.476-5.438,1.188
                                                      C33.152,10.324,33,11.5,33,11.5v5.783c0.609,0.55,1,1.337,1,2.217v4c0,1.345-0.902,2.477-2.127,2.854
                                                      c-0.683,2.122-1.667,4.145-2.969,5.984C28.576,32.802,28.268,33.195,28,33.5v3.748c0,0.853,0.299,1.659,0.818,2.297h2.751
                                                      c0.687,0,0.99,0.868,0.451,1.293c-0.186,0.147-0.364,0.283-0.53,0.406l8.077,4.038C42.283,46.642,44,49.419,44,52.457V55.5h14
                                                      v-2.697C58,50.11,56.479,47.648,54.07,46.444z" />
                            </g>
                            <g id="freePlace" transform="scale(0.025)">
                              <g>
                                <g>
                                  <path style={{ fill: "#C7CBC7" }} d="M256,406.069c-4.882,0-8.828-3.955-8.828-8.828v-35.31c0-4.873,3.946-8.828,8.828-8.828
			s8.828,3.955,8.828,8.828v35.31C264.828,402.114,260.882,406.069,256,406.069" />
                                  <path style={{ fill: "#C7CBC7" }} d="M123.586,459.034c-4.882,0-8.828-3.955-8.828-8.828v-17.655c0-4.873,3.946-8.828,8.828-8.828
			c4.882,0,8.828,3.955,8.828,8.828v17.655C132.414,455.08,128.468,459.034,123.586,459.034" />
                                  <path style={{ fill: "#C7CBC7" }} d="M123.577,441.379c-4.017,0-7.645-2.754-8.598-6.841c-1.095-4.749,1.871-9.49,6.621-10.593
			l114.759-26.483c4.74-1.077,9.49,1.871,10.593,6.621c1.095,4.749-1.871,9.49-6.621,10.593l-114.759,26.483
			C124.902,441.309,124.231,441.379,123.577,441.379" />
                                  <path style={{ fill: "#C7CBC7" }} d="M388.414,459.034c-4.882,0-8.828-3.955-8.828-8.828v-17.655c0-4.873,3.946-8.828,8.828-8.828
			c4.882,0,8.828,3.955,8.828,8.828v17.655C397.241,455.08,393.295,459.034,388.414,459.034" />
                                  <path style={{ fill: "#C7CBC7" }} d="M388.423,441.379c-0.653,0-1.324-0.071-1.995-0.221l-114.759-26.483
			c-4.749-1.103-7.715-5.844-6.621-10.593c1.103-4.749,5.862-7.698,10.593-6.621L390.4,423.945
			c4.749,1.103,7.715,5.844,6.621,10.593C396.067,438.625,392.439,441.379,388.423,441.379" />
                                  <path style={{ fill: "#C7CBC7" }} d="M211.862,459.034c-2.26,0-4.52-0.865-6.241-2.586c-3.452-3.452-3.452-9.031,0-12.482l26.483-26.483
			c3.452-3.452,9.031-3.452,12.482,0c3.452,3.452,3.452,9.031,0,12.482l-26.483,26.483
			C216.382,458.169,214.122,459.034,211.862,459.034" />
                                  <path style={{ fill: "#C7CBC7" }} d="M300.138,459.034c-2.26,0-4.52-0.865-6.241-2.586l-26.483-26.483
			c-3.452-3.452-3.452-9.031,0-12.482c3.452-3.452,9.031-3.452,12.482,0l26.483,26.483c3.452,3.452,3.452,9.031,0,12.482
			C304.658,458.169,302.398,459.034,300.138,459.034" />
                                  <path style={{ fill: "#C7CBC7" }} d="M114.759,291.31c-19.474,0-35.31-15.837-35.31-35.31v-52.966c0-4.873,3.946-8.828,8.828-8.828
			c4.882,0,8.828,3.955,8.828,8.828V256c0,9.737,7.918,17.655,17.655,17.655c4.882,0,8.828,3.955,8.828,8.828
			C123.586,287.356,119.64,291.31,114.759,291.31" />
                                </g>
                                <polygon style={{ fill: "#DD342E" }} points="70.621,203.034 105.931,203.034 105.931,167.724 70.621,167.724 	" />
                                <path style={{ fill: "#C7CBC7" }} d="M397.241,291.31c-4.882,0-8.828-3.955-8.828-8.828c0-4.873,3.946-8.828,8.828-8.828
		c9.737,0,17.655-7.918,17.655-17.655v-52.966c0-4.873,3.946-8.828,8.828-8.828c4.882,0,8.828,3.955,8.828,8.828V256
		C432.552,275.474,416.715,291.31,397.241,291.31" />
                                <polygon style={{ fill: "#DD342E" }} points="406.069,203.034 441.379,203.034 441.379,167.724 406.069,167.724 	" />
                                <path style={{ fill: "#C7CBC7" }} d="M256,273.547c-4.882,0-8.828-3.955-8.828-8.828v-44.032c0-4.873,3.946-8.828,8.828-8.828
		s8.828,3.955,8.828,8.828v44.032C264.828,269.593,260.882,273.547,256,273.547" />
                                <g>
                                  <path style={{ fill: "#DD342E" }} d="M320.084,229.517H191.916c-22.846,0-41.119-18.988-40.236-41.816l5.729-148.983
			C158.239,17.099,176.009,0,197.645,0h116.71c21.636,0,39.406,17.099,40.236,38.718l5.729,148.983
			C361.203,210.529,342.93,229.517,320.084,229.517" />
                                  <path style={{ fill: "#DD342E" }} d="M255.996,335.448c-44.138,0-141.241-8.828-141.241-44.138c0-17.382,17.938-26.483,35.31-26.483
			h213.945c15.157,0,33.227,9.384,33.227,26.483C397.238,326.621,299.72,335.448,255.996,335.448" />
                                </g>
                                <g>
                                  <polygon style={{ fill: "#546A79" }} points="238.345,361.931 273.655,361.931 273.655,335.448 238.345,335.448 		" />
                                  <polygon style={{ fill: "#546A79" }} points="238.345,423.724 273.655,423.724 273.655,397.241 238.345,397.241 		" />
                                </g>
                                <g>
                                  <path style={{ fill: "#38454F" }} d="M154.483,481.103c0,17.064-13.833,30.897-30.897,30.897S92.69,498.167,92.69,481.103
			c0-17.064,13.833-30.897,30.897-30.897S154.483,464.04,154.483,481.103" />
                                  <path style={{ fill: "#38454F" }} d="M423.724,481.103c0,17.064-13.833,30.897-30.897,30.897c-17.064,0-30.897-13.833-30.897-30.897
			c0-17.064,13.833-30.897,30.897-30.897C409.891,450.207,423.724,464.04,423.724,481.103" />
                                  <path style={{ fill: "#38454F" }} d="M238.345,481.103c0,17.064-13.833,30.897-30.897,30.897s-30.897-13.833-30.897-30.897
			c0-17.064,13.833-30.897,30.897-30.897S238.345,464.04,238.345,481.103" />
                                  <path style={{ fill: "#38454F" }} d="M335.448,481.103c0,17.064-13.833,30.897-30.897,30.897s-30.897-13.833-30.897-30.897
			c0-17.064,13.833-30.897,30.897-30.897S335.448,464.04,335.448,481.103" />
                                </g>
                              </g>
                            </g>
                            <g id="pointer" transform="scale(0.8)">
                              <path d="M0-1c-14.5-25.6-14.5-25.7-14.5-33.8c0-8.1,6.5-14.6,14.5-14.6s14.5,6.6,14.5,14.6C14.5-26.7,14.5-26.6,0-1z" />
                              <path d="M0-49c7.7,0,14,6.3,14,14.1c0,8,0,8.1-14,32.8c-14-24.7-14-24.9-14-32.8C-14-42.7-7.7-49,0-49 M0-50c-8.3,0-15,6.8-15,15.1 S-15-26.5,0,0c15-26.5,15-26.5,15-34.9S8.3-50,0-50L0-50z" />
                            </g>
                            <g id="map-container" className="#map-container" />
                          </defs>
                          <use href="#map-container" x={0} y={0} />
                        </svg>
                      </ReactSVGPanZoom>}
                  </AutoSizer>
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-12" style={{ height: "500px", overflowY: "scroll" }}>
                    <ListGroup id="listGroupe" href="#" hover>
                      {filteredCountries.map ? filteredCountries.map(
                            seat => {
                              return this.renderSeat(seat);
                            }
                          ) : ""}
                    </ListGroup>
                  </div>
                </div>
              </div>
            </div>
            <Modal isOpen={this.state.modal}>
              <ModalHeader>Create Position</ModalHeader>
              <ModalBody>
              <form>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Type : </label>
                    <div className="col-sm-10">
                    <select className="mdb-select form-control" onChange={this._handleChange}>
                      <option value="" defaultValue>Choose your option</option>
                      <option value="freePlace">Collaborateur</option>
                      <option value="visioRoom">Visio-Room</option>
                      <option value="meetingRoom">Meeting-Room</option>
                      <option value="WC">WC</option>
                      <option value="escal">Escalier</option>
                      <option value="ascenseur">Ascenseur</option>
                      <option value="Infirmerie">Infirmerie</option>
                    </select>  
                    </div>
                  </div>
                  <div id="divName" className="form-group row hidden">
                    <label className="col-sm-2 col-form-label">Name :</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="inputName" placeholder="Name"/>
                    </div>
                  </div>
              </form>
                
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.close}>
                  Close
                </Button>
                <Button color="primary" onClick={this.validate}>
                  Save changes
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalAffect}>
              <ModalHeader>Affect Place</ModalHeader>
              <ModalBody>Are you sure ?</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.close}>
                  Close
                </Button>
                <Button color="primary" onClick={this.AffectValidation}>
                  Affect to me
                </Button>
              </ModalFooter>
            </Modal>
            
            <Footer color="indigo">
            <p className="footer-copyright mb-0">
                <img src={legende} width={400}/>
            </p>
              <p className="footer-copyright mb-0">
                
                &copy; {new Date().getFullYear()} Copyright
              </p>
            </Footer>
          </main>
        </Container>
      </div>;
  }
}
