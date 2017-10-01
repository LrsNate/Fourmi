import React, { Component } from 'react';

import type { Work } from '../types';

type Props = {
  onSelect: Work => void,
  works: Work[]
};

const MAX_LINE_SIZE = 40;

class WorkSearch extends Component<Props> {
  handleTouchTap(work: Work) {
    const { onSelect } = this.props;
    return () => onSelect(work);
  }

  handleEdit(work: Work) {
    return () => console.log(work);
  }

  renderPrimaryText(work: Work) {
    const reference = work.reference
      ? `${work.author} - ${work.reference}`
      : work.author;

    return work.title ? `${reference} : ${work.title}` : reference;
  }

  renderSecondaryText(work: Work) {
    const text = work.latinText || work.frenchText;
    const firstLine = text.split('\n')[0];

    return firstLine.length > MAX_LINE_SIZE ? `${firstLine}...` : firstLine;
  }

  render() {
    return <p>Foo!</p>;
  }
}

export default WorkSearch;
