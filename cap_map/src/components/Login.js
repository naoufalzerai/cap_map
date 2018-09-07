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

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName : "",
      password : ""
      };
      this.navigate_to = this.navigate_to.bind(this) 
    };
  
    navigate_to(){

      var testLogin=true;
      if(testLogin){
        this.props.history.push("/admin");
      }else{
        console.log("erreur")
      }
      
      
  }
  render() {
    const divBrowser = { overflow: "hidden", border: "1px solid #222222" };


    return <div>
    <div class="container">
    <div class="row">
    <div class="col-4"></div>
    <div class="col-4 loginForm">
    <form >
        <div class="form-group" >
          <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Login"/>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
      </form>
      <button type="submit" class="btn btn-primary" onClick={()=>this.navigate_to()}>Submit</button>
    </div>
    <div class="col-4"></div>
    </div>
    </div>
    
</div>;
  }
}
