import React, { Component } from "react";
import { connect } from "react-redux";

class Search extends Component {
  render() {
    return <p>Foo!</p>;
  }
}

const mapStateToProps = state => ({
  epigrams: state.epigrams
});

export default connect(mapStateToProps)(Search);
