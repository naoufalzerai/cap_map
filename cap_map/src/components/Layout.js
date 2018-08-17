import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink} from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
//import 'mdbreact/dist/css/mdb.css';
import logo from '../svg/logo.svg';
import '../css/App.css';



export class Layout extends Component {
  render() {
    return <div className="App">
        
          <Navbar className = "navbar navbar-expand-lg navbar-dark bg-dark" >
            <NavbarBrand href="/">
              <img src={logo} height="25px" alt="logo" />
            </NavbarBrand>
          <NavbarNav left>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/">About</NavLink>
            </NavItem>
          </NavbarNav>
          </Navbar>
        
        {this.props.children}
      </div>;
  }
}
