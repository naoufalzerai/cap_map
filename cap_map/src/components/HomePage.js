import React, { Component } from 'react';
import { Button, Input, Footer, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';


export class HomePage extends Component {
    state = {
        search : ""
    }

    renderCountry = country =>{
        const {search} = this.state;
        var code = country.code.toLowerCase()

        /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
            return null
        }*/
        this.blankImg = "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiwhNrMttjcAhUDZlAKHXDKBEMQjRx6BAgBEAU&url=https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2FGoogle_Chrome&psig=AOvVaw0dafZYCuByYD2lrCO2uqs2&ust=1533644851458801";
        return <div className="col-md-3" style={{ marginTop : '20px' }}>
            <Card>
                <CardBody>
                    <p className=""><img src={this.blankImg} className={ "flag flag-"+code } alt={country.name} /></p>
                    <CardTitle title={country.name}>{country.name.substring(0, 15)}{ country.name.length > 15 && "..."}</CardTitle>
                </CardBody>
            </Card>
        </div>
    }

    onchange = e =>{
        this.setState({ search : e.target.value });
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
            <main style={{marginTop: '4rem'}}>
                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <Input label="Search Country" icon="search" onChange={this.onchange}/>
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

