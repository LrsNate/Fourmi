import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import WorkEditor from '../../components/WorkEditor';
import { workType } from '../../types';

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  return {
    work: _.find(state.works, { _id: id })
  };
}

class Edit extends Component {
  static propTypes = {
    work: workType.isRequired
  };

  renderSaveButtons() {}

  render() {
    const { work } = this.props;
    return (
      <div>
        <WorkEditor work={work} />
        {this.renderSaveButtons()}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Edit));
