import PropTypes from "prop-types";
import React from "react";

import FourmiPropTypes from "../constants/types";

const EpigramEditor = ({ epigram, onSave }) => {
  return (
    <div>
      <p>{epigram.title}</p>
      <button type="button" onClick={onSave}>
        Go back
      </button>
    </div>
  );
};

EpigramEditor.propTypes = {
  epigram: FourmiPropTypes.epigram.isRequired,
  onSave: PropTypes.func.isRequired
};

export default EpigramEditor;
