import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Inputs extends Component {
  constructor() {
    super();
    this.state = {
      inputOne: "",
      inputTwo: ""
    };
  }

  onChange = e => {
    //update state when a user updates a value in an input
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    //get current input values when the user hits "calculate"
    e.preventDefault();
    const { inputOne, inputTwo } = this.state;

    //make sure the input values aren't identical
    if (inputOne === inputTwo) {
      alert("You have entered the same zipcode twice!");
      return null;
    }
    //get the distance between zip codes
    this.calculateDistance(inputOne, inputTwo);
  };

  calculateDistance = (zipOne, zipTwo) => {
    //Find zipcode in data array, alert user if no object is found
    //extract relevant data from the found object
    let firstZip = this.getObjectFromArray(zipOne);
    if (firstZip === undefined) {
      alert("Sorry, your first zipcode was not found.");
      return null;
    }
    const lat1 = firstZip.Lat;
    const long1 = firstZip.Long;
    const city1 = firstZip.City;

    let secondZip = this.getObjectFromArray(zipTwo);
    if (secondZip === undefined) {
      alert("Sorry, your second zipcode was not found.");
      return null;
    }
    const lat2 = secondZip.Lat;
    const long2 = secondZip.Long;
    const city2 = secondZip.City;

    //get the distance
    const distance = this.distance(lat1, long1, lat2, long2);

    //pass the distance to the parent component
    this.props.updateResults(distance, city1, city2);
  };

  getObjectFromArray(zip) {
    //searches for object matching the passed zip
    return this.props.zipArray.find(function(element) {
      return element.Zipcode === zip;
    });
  }

  distance(lat1, lon1, lat2, lon2) {
    //calculates distance between lat/long points
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)) * 0.62137; // 2 * R; R = 6371 km
  }

  render() {
    const { inputOne, inputTwo } = this.state;
    return (
      <ZipForm onSubmit={this.onSubmit} method="post" target="_blank" enctype="text/plain">
        <ZipInput
          type="text"
          required
          value={inputOne}
          name="inputOne"
          onChange={this.onChange}
          placeholder="First Zipcode"
          pattern="[0-9]{5}"
        />
        <ZipInput
          type="text"
          required
          value={inputTwo}
          name="inputTwo"
          onChange={this.onChange}
          placeholder="Second Zipcode"
          pattern="[0-9]{5}"
        />
        <ZipCalculate type="submit">Calculate</ZipCalculate>
      </ZipForm>
    );
  }
}

Inputs.propTypes = {
  zipArray: PropTypes.array,
  updateResults: PropTypes.func
};

export default Inputs;

const ZipForm = styled.form`
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
`;

const ZipInput = styled.input`
  width: 100%;
  height: 60px;
  margin-bottom: 5px;
  background: none;
  border: none;
  border-bottom: 1px solid #34495e;
  outline: none;
  font: 300 28px "Ubuntu", sans-serif;
  padding-top: 20px;
  color: #34495e;
  text-align: center;
  &:focus::-webkit-input-placeholder {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.1s, opacity 0.1s linear;
  }
  &:required {
    box-shadow: none;
  }
  @media (max-width: 420px) {
    font-size: 22px;
  }
`;

const ZipCalculate = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 2em;
  background: none;
  border: 1px solid #34495e;
  outline: none;
  font: 300 28px "Ubuntu", sans-serif;
  padding: 5px;
  color: #34495e;
  text-align: center;
  &:hover {
    cursor: pointer;
    background: #2c3e50;
    color: #ecf0f1;
    transition: all 0.2s ease-in;
  }
  @media (max-width: 420px) {
    font-size: 22px;
  }
`;
