import React from "react";
import { connect } from "react-redux";

const Edit = () => <p>Foo!</p>;

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const { epigrams: { epigrams } } = state;

  return { epigram: epigrams[id] };
};

export default connect(mapStateToProps)(Edit);
