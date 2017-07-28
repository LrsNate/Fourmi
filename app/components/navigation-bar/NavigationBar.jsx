import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';

class NavigationBar extends Component {
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.handleLeftIconClick = this.handleLeftIconClick.bind(this);
  }

  handleLeftIconClick() {
    this.props.history.push('/');
  }

  render() {
    const routes = [
      { title: 'Rechercher une oeuvre', path: '/', icon: <NavigationClose /> },
      { title: 'Enregistrer une nouvelle oeuvre', path: '/add', icon: <NavigationClose /> },
      { title: 'Éditer une oeuvre', path: '/edit', icon: <NavigationClose /> },
    ];

    return (
      <Switch>
        {routes.map(({ title, path, icon }) => (
          <Route
            key={path}
            path={path}
            render={() => (
              <AppBar
                title={title}
                iconElementLeft={<IconButton onClick={this.handleLeftIconClick}>{icon}</IconButton>}
              />
            )}
          />
        ))}
      </Switch>
    );
  }
}

export default withRouter(NavigationBar);
