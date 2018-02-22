import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class DistanceDisplay extends Component {
  capitalizeFirstLetter = string => {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  render() {
    const { firstCity, secondCity } = this.props;
    if (!this.props.result) return null;
    return (
      <div>
        <ResultText>
          {this.capitalizeFirstLetter(firstCity)} is {this.props.result.toFixed(2)} miles from{" "}
          {this.capitalizeFirstLetter(secondCity)}
        </ResultText>
      </div>
    );
  }
}

DistanceDisplay.propTypes = {
  result: PropTypes.number,
  firstCity: PropTypes.string,
  secondCity: PropTypes.string
};

export default DistanceDisplay;

const ResultText = styled.h1`
  text-align: center;
  color: #2c3e50;
  font-weight: 100;
`;
