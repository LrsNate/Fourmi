export type Epigrams = { [key: string]: Epigram };

export interface Epigram {
  _id: string;
  originId?: string;
  author: string;
  reference: string;
  title: string;
  meter: string;
  stanza: string;
  addressee: string;
  date: number | string;
  vices: string[];
  latinText: string;
  frenchText: string;
  tags: string[];
  notes: string;
}
