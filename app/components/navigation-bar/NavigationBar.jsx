import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

class NavigationBar extends Component {
  handleLeftIconClick() {
    console.log('Go back!');
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

export default NavigationBar;
