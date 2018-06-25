import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import "isomorphic-fetch";

export class FetchData extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <p>
        <em>loaded...</em>
      </p>
    );

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

}
