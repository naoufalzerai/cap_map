import React, { Component } from 'react'
import { Button, Input, Footer, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

export default class HomePage extends Component {
    state = {
        search: ""
    }

    renderCountry = country => {
        const { search } = this.state;
        var code = country.code.toLowerCase()

        /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
            return null
        }*/

        return <div className="col-md-3" style={{ marginTop: '20px' }}>
            <Card>
                <CardBody>
                    <p className=""><img src={blankImg} className={"flag flag-" + code} alt={country.name} /></p>
                    <CardTitle title={country.name}>{country.name.substring(0, 15)}{country.name.length > 15 && "..."}</CardTitle>
                </CardBody>
            </Card>
        </div>
    }

    onchange = e => {
        this.setState({ search: e.target.value });
    }

    render() {

        const { search } = this.state;
        const filteredCountries = countriesList.filter(country => {
            return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })

        return (
            <div className="flyout">
                <main style={{ marginTop: '4rem' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <Input label="Search Country" icon="search" onChange={this.onchange} />
                            </div>
                            <div className="col"></div>
                        </div>
                        <div className="row">
                            {
                                filteredCountries.map(country => {
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