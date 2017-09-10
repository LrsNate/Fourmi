/* @flow */
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import { grey400 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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

  renderIconMenu(work: Work) {
    const iconButtonElement = (
      <IconButton touch tooltip="Options" tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.handleEdit(work)}>Éditer</MenuItem>
        <MenuItem>Imitations</MenuItem>
      </IconMenu>
    );
  }

  render() {
    const { works } = this.props;
    const listElements = works.map(work =>
      <ListItem
        key={work._id}
        primaryText={this.renderPrimaryText(work)}
        secondaryText={this.renderSecondaryText(work)}
        rightIconButton={this.renderIconMenu(work)}
        onTouchTap={this.handleTouchTap(work)}
      />
    );

    return (
      <List>
        {listElements}
      </List>
    );
  }
}

export default WorkSearch;
