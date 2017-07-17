import { List, ListItem } from 'material-ui/List';
import React, { Component, PropTypes } from 'react';

class WorkSearch extends Component {
  static get propTypes() {
    return {
      onSelect: PropTypes.func.isRequired,
      works: PropTypes.array.isRequired,
    };
  }

  render() {
    const { works, onSelect } = this.props;
    const authors = works.map(work => (
      <ListItem
        primaryText={work.author}
        secondaryText={work.reference}
        onTouchTap={onSelect}
      />
  ));

    return (
      <List>
        {authors}
      </List>
    );
  }
}

export default WorkSearch;
