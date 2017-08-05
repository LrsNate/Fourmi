import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import WorkSearch from '../../components/work-search/WorkSearch';

function mapStateToProps(state) {
  return {
    works: state.works.slice(0, 20)
  };
}

class Search extends Component {
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      works: PropTypes.array.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(work) {
    this.props.history.push(`/edit/${work._id}`);
  }

  render() {
    const { works } = this.props;
    return <WorkSearch works={works} onSelect={this.handleSelect} />;
  }
}

export default withRouter(connect(mapStateToProps)(Search));
