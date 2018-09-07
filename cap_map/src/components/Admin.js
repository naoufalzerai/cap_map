import React, { Component } from "react";
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
  ListGroupItem,
  Table
} from "mdbreact";

export class Admin extends  Component {
  constructor() {
      super();
      this.state = {
        countriesList : [{
            "name": "Rabat",
            "code": "RBA",
            "photo": "http://localhost:3000/svg/Rabat.svg",
            "country":"Maroc",
            "building" : "A7",
        },
        {
            "name": "Casa",
            "code": "CAS",
            "photo": "http://localhost:3000/svg/Casa.svg",
            "country":"Maroc",
            "building" : "B8"
        },
        {
            "name": "Paris",
            "code": "prs",
            "photo": "http://localhost:3000/svg/Paris.svg",
            "country":"France",
            "building" : "A89",
            
        }
    ],
        hideBuildingListStep : false,
        modalAddBuilding:false,
      };
      this.addBuilding = this.addBuilding.bind(this);
      this.validAddBuiling = this.validAddBuiling.bind(this);
      this.close = this.close.bind(this);
      
      
  }
      
  close() {
    this.setState({
        modalAddBuilding: false,
    });
  }
  addBuilding(){
    this.setState({
        modalAddBuilding: !this.state.modalAddBuilding
      });
  }
  validAddBuiling(){
      let obj={
        "name": document.getElementById("inputCity").value,
        "code": document.getElementById("inputCity").value,
        "photo": "http://localhost:3000/svg/Casa.svg",
        "country": document.getElementById("inputCountry").value,
        "building" : document.getElementById("inputBuilding").value,
      };
    this.state.countriesList.push(obj)
    this.setState({
        modalAddBuilding: false,
        countriesList: this.state.countriesList
    });
}

   render() {
    let nbrBuilding = 0;
    
      
      return <div className="container">
          <h1>Building List</h1>
          <div className="row marginBottom20">
          <div className="col-sm-3"></div>
                <div className="col-sm-1">
                <button type="button" className="btn btn-success" onClick={this.addBuilding}>
                        + Add new Building
                      </button>
                </div>
          </div>
          <div id="firstStep" className={this.state.hideBuildingListStep ? 'hidden' : ''}>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Country</th>
      <th>City</th>
      <th>Building</th>
      <th>details</th>
    </tr>
  </thead>
  <tbody>
  {this.state.countriesList.map(function(item) {
                        nbrBuilding++;
                          return <tr>
                          <td>{nbrBuilding}</td>
                          <td>{item.country}</td>
                          <td>{item.name}</td>
                          <td>{item.building}</td>
                          <td><button type="button" class="btn btn-info">+</button></td>
                        </tr>;
                        })}
    
    
  </tbody>
</Table>
                </div>
                <div className="col-sm-3"></div>
            </div>
          
</div>
<Modal isOpen={this.state.modalAddBuilding}>
              <ModalHeader>Add New Building</ModalHeader>
              <ModalBody>
              <div className="row">
          <div className="col-sm-12">
              
          <form>

<div className="form-group row">
  <label class="col-sm-4 col-form-label text-right">Country : </label>
  <div class="col-sm-8">
  <input class="form-control" id="inputCountry" placeholder="Country"/>
  </div>
</div>

<div className="form-group row">
  <label class="col-sm-4 col-form-label text-right">City : </label>
  <div class="col-sm-8">
  <input class="form-control" id="inputCity" placeholder="City"/>
  </div>
</div>

<div className="form-group row">
  <label class="col-sm-4 col-form-label text-right">Building : </label>
  <div class="col-sm-8">
  <input class="form-control" id="inputBuilding" placeholder="Building"/>
  </div>
</div>

<div className="form-group row">
  <label class="col-sm-4 col-form-label text-right">Floors : </label>
  <div class="col-sm-8">
  <select id="inputFloors" className="form-control">
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  </select>
  </div>
</div>

<div className="form-group row">
  <label class="col-sm-4 col-form-label text-right">Address : </label>
  <div class="col-sm-8">
  <input class="form-control" id="inputAddress" placeholder="Address"/>
  </div>
</div>

<div className="form-group row">
  <label class="col-sm-4 col-form-label text-right">Commentaire : </label>
  <div class="col-sm-8">
  <textarea className="form-control" id="TextareaCommentaire" placeholder="Commentaire"></textarea>
  </div>
</div>

</form>
          </div>
</div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.close}>
                  Close
                </Button>
                <Button color="primary" onClick={this.validAddBuiling}>
                  Valider
                </Button>
              </ModalFooter>
            </Modal>
</div>;
  }

}