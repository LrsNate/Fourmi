import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initializeWorksAction } from '../../actions/initializeWorks';

function mapStateToProps(state) {
  return {
    works: state.works,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initializeWorks() {
      dispatch(initializeWorksAction());
    },
  };
}

class Search extends Component {
  static get propTypes() {
    return {
      initializeWorks: PropTypes.func.isRequired,
    };
  }
  componentWillMount() {
    this.props.initializeWorks();
  }

  render() {
    return (
      <p>Foo!</p>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
