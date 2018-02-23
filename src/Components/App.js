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
    //get data from csv on initial load
    this.getZipData();
  }

  getZipData = () => {
    //get file location
    const zipFile = require("../DataFiles/free-zipcode-database.csv");

    //parse zipcode data from file and save to state
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
    //get distance and info from <Input> and update state
    this.setState({ distanceResult: distance, firstCity, secondCity });
  };
  render() {
    const { zipData, distanceResult, firstCity, secondCity } = this.state;
    return (
      <AppContainer>
        <header>
          <AppTitle>ZipDistance Calculator</AppTitle>
        </header>
        <Inputs zipArray={zipData} updateResults={this.zipDistanceResult} />
        <DistanceDisplay result={distanceResult} firstCity={firstCity} secondCity={secondCity} />
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
