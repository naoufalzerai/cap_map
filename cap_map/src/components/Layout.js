import React, { Component } from 'react';
import { Navbar, NavbarBrand,NavbarToggler, NavbarNav, NavItem, NavLink,Fa,Collapse} from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
//import 'mdbreact/dist/css/mdb.css';
import logo from '../svg/logo.svg';
import '../css/App.css';



export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  render() {
    return <div className="App">
        
        <Navbar dark expand="md" scrolling  className = "bg-dark">
                    <NavbarBrand href="/">
                      <img src={logo} height="25px" alt="logo" /> <span className="logoCapMap">Cap Map</span>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left>
                          <NavItem>
                            <NavLink to="/"><Fa icon="home" list/> Accueil</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink to="/login"><Fa icon="wrench" list/> Admin</NavLink>
                          </NavItem>
                          
                        </NavbarNav>
                        <NavbarNav right>
                          <NavItem>
                            <NavLink to="/"><Fa icon="support" list/> Aide</NavLink>
                          </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
        {this.props.children}
      </div>;
  }
}
