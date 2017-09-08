import { arrayOf, number, oneOfType, shape, string } from 'prop-types';

export const workType = shape({
  _id: string.isRequired,
  author: string.isRequired,
  reference: string,
  title: string,
  date: oneOfType([number, string]),
  stanza: string,
  meter: string,
  vices: arrayOf(string),
  tags: arrayOf(string),
  notes: string,
  latinText: string,
  frenchText: string
});

export default { workType };
