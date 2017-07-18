import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initializeWorksAction } from '../../actions/initializeWorks';
import WorkSearch from '../../components/work-search/WorkSearch';

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
      works: PropTypes.array.isRequired,
    };
  }
  componentWillMount() {
    this.props.initializeWorks();
  }

  handleSelect(work) {
    console.log(work);
  }

  render() {
    const { works } = this.props;
    return (
      <WorkSearch works={works} onSelect={this.handleSelect} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
