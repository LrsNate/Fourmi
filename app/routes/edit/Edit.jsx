import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import WorkEditor from '../../components/work-editor/WorkEditor';

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  return {
    work: _.find(state.works, { _id: id })
  };
}

class Edit extends Component {
  static get propTypes() {
    return {
      work: PropTypes.object.isRequired
    };
  }

  render() {
    const { work } = this.props;
    return <WorkEditor work={work} />;
  }
}

export default withRouter(connect(mapStateToProps)(Edit));
