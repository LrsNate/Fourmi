import PropTypes from "prop-types";

const epigram = PropTypes.shape({
  _id: PropTypes.string,
  author: PropTypes.string,
  reference: PropTypes.string,
  title: PropTypes.string,
  meter: PropTypes.string,
  stanza: PropTypes.string,
  addressee: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  vices: PropTypes.arrayOf(PropTypes.string),
  latinText: PropTypes.string,
  frenchText: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  notes: PropTypes.string
});

export default { epigram };
