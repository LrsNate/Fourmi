import { sprintf } from 'sprintf-js';

const _ = require('lodash');

export default class SortHelperService {

  constructor(ofRomanFilter) {
    this.ofRoman = ofRomanFilter;
  }

  static get $inject() {
    return ['ofRomanFilter'];
  }

  getSortKey(docs, doc) {
    let reference = SortHelperService.resolveReference(docs, doc);
    if (reference === null) return ['9999', '9999', _.lowerCase(doc.author)];

    reference = reference.split(', ');

    const numeralFirstReference = reference[0] === 'De Spectaculis' ? 0 : this.ofRoman(reference[0]);
    const refCore = parseInt(reference[1], 10);
    // noinspection ES6ModulesDependencies
    const refPostfix = reference[1].substr(Math.log10(refCore));

    return [
      sprintf('%04d', numeralFirstReference),
      sprintf('%04d', refCore) + refPostfix,
      _.lowerCase(doc.author === 'Martial' ? 'a' : doc.author),
    ];
  }

  static resolveReference(docs, doc) {
    if (doc.author === 'Martial') {
      return doc.reference;
    }
    if (doc.originId) {
      const originWork = _.find(
        docs,
        o => doc.originId === o._id // eslint-disable-line no-underscore-dangle
      );
      if (originWork.author === 'Martial') {
        return originWork.reference;
      }
    }
    return null;
  }
}
