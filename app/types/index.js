/* @flow */

export type Work = {
  _id: string,
  author: string,
  reference?: string,
  title?: string,
  date?: number | string,
  stanza?: string,
  meter?: string,
  vices: string[],
  tags: string[],
  notes: string,
  latinText: string,
  frenchText: string
};
