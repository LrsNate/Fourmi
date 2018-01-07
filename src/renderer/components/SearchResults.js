import PropTypes from 'prop-types';
import React from "react";
import FourmiPropTypes from "../constants/types";
import EpigramView from "./epigramView/EpigramView";

const SearchResults = ({ results, goToEditPage, onFilterByImitations }) => {
  return results
    .slice(0, 20)
    .map(e => (
      <EpigramView
        epigram={e}
        goToEditPage={goToEditPage}
        filterByImitations={onFilterByImitations}
        key={e._id}
      />
    ));
};

SearchResults.propTypes = {
  goToEditPage: PropTypes.func.isRequired,
  onFilterByImitations: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired,
};

export default SearchResults;
