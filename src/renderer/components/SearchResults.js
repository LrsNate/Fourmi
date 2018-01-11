import PropTypes from "prop-types";
import React from "react";
import FourmiPropTypes from "../constants/types";
import EpigramView from "./epigramView/EpigramView";

const SearchResults = ({
  results,
  actions,
  goToEditPage,
  onFilterByImitations
}) => {
  return results
    .slice(0, 20)
    .map(e => (
      <EpigramView
        actions={actions}
        epigram={e}
        goToEditPage={goToEditPage}
        filterByImitations={onFilterByImitations}
        key={e._id}
      />
    ));
};

SearchResults.propTypes = {
  actions: PropTypes.func,
  goToEditPage: PropTypes.func.isRequired,
  onFilterByImitations: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(FourmiPropTypes.epigram).isRequired
};

SearchResults.defaultProps = {
  actions: null
};

export default SearchResults;
