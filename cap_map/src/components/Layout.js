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
        <header className="App-header">
          <Navbar color="unique-color-dark" dark>
            <NavbarBrand href="/">
              <img src={logo} className="App-logo" alt="logo" />
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
          
        </header>
        {this.props.children}
      </div>;
  }
}
