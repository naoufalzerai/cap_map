import React, { Component } from 'react';
import {  Input, Footer, Card, CardBody, CardTitle } from 'mdbreact';
import building from '../svg/building.svg';


export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.navigate_to = this.navigate_to.bind(this)    
    }
    state = {
        search : ""
    }

    renderCountry = country =>{
        //const {search} = this.state;
        var code = country.code.toLowerCase()

        /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
            return null
        }*/
        
        return <div className="col-md-2" style={{ marginTop: "20px" }}>
            <Card>
              <CardBody onClick={()=>this.navigate_to(country.code)}>
                <p className="pointer-href">
                  <img src={building} className={"flag flag-" + code} alt={country.name} />
                </p>
                <CardTitle title={country.name}>
                  {country.name.substring(0, 15)}
                  {country.name.length > 15 && "..."}
                </CardTitle>
              </CardBody>
            </Card>
          </div>;
    }

    onchange = e =>{
        this.setState({ search : e.target.value });
    }
    navigate_to(val){
        this.props.history.push("/browse/" + val);
        
    }
    render() {
        let countriesList = [{
                "name": "Rabat",
                "code": "RBA"
            },
            {
                "name": "Casa",
                "code": "CAS"
            },
            {
                "name": "PARIS",
                "code": "prs"
            }
        ];
        const {search} = this.state;
        const filteredCountries = countriesList.filter( country =>{
            return country.name.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })

        return (
            <div className="flyout">
            <main style={{marginTop: '1rem'}}>
                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <Input hint="Type the office name ..." icon="search" onChange={this.onchange}/>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row">
                        {
                            filteredCountries.map( country =>{
                                return this.renderCountry(country)
                            })
                        }
                    </div>
                </div>
            </main>
            <Footer color="indigo">
                <p className="footer-copyright mb-0">
                &copy; {(new Date().getFullYear())} Copyright
                </p>
            </Footer>
            </div>
        );
    }
}

