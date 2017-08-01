import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import { grey400 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const MAX_LINE_SIZE = 40;

class WorkSearch extends Component {
  static get propTypes() {
    return {
      onSelect: PropTypes.func.isRequired,
      works: PropTypes.array.isRequired
    };
  }

  handleTouchTap(work) {
    const { onSelect } = this.props;
    return () => onSelect(work);
  }

  handleEdit(work) {
    return () => console.log(work);
  }

  renderPrimaryText(work) {
    const reference = work.reference
      ? `${work.author} - ${work.reference}`
      : work.author;

    return work.title ? `${reference} : ${work.title}` : reference;
  }

  renderSecondaryText(work) {
    const text = work.latinText || work.frenchText;
    const firstLine = text.split('\n')[0];

    return firstLine.length > MAX_LINE_SIZE ? `${firstLine}...` : firstLine;
  }

  renderIconMenu(work) {
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
