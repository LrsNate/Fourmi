/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';

import type { Work, State } from '../types';
import WorkSearch from '../components/WorkSearch';

type Props = {
  works: Work[],
  history: RouterHistory
};

function mapStateToProps(state: State) {
  return {
    works: state.works.slice(0, 20)
  };
}

class Search extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect: Work => void;

  handleSelect(work: Work) {
    this.props.history.push(`/edit/${work._id}`);
  }

  render() {
    const { works } = this.props;
    return <WorkSearch works={works} onSelect={this.handleSelect} />;
  }
}

export default withRouter(connect(mapStateToProps)(Search));
