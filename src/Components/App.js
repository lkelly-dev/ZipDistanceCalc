import React, { Component } from "react";
import Inputs from "./Inputs";
import DistanceDisplay from "./DistanceDisplay";
import Papa from "papaparse";
import styled from "styled-components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipData: [],
      distanceResult: null
    };
  }
  componentDidMount() {
    this.getZipData();
  }

  getZipData = () => {
    const zipFile = require("./free-zipcode-database.csv");
    Papa.parse(zipFile, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: results => {
        this.setState({ zipData: results.data });
      }
    });
  };

  zipDistanceResult = (distance, firstCity, secondCity) => {
    this.setState({ distanceResult: distance, firstCity, secondCity });
  };
  render() {
    return (
      <AppContainer>
        <header>
          <AppTitle>ZipDistance Calculator</AppTitle>
        </header>
        <Inputs zipArray={this.state.zipData} updateResults={this.zipDistanceResult} />
        <DistanceDisplay
          result={this.state.distanceResult}
          firstCity={this.state.firstCity}
          secondCity={this.state.secondCity}
        />
      </AppContainer>
    );
  }
}

export default App;

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-family: "Montserrat", sans-serif;
  max-width: 1000px;
  margin: 0 auto;
`;

const AppTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
`;
