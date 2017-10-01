/* @flow */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';

type Props = {
  history: RouterHistory
};

class NavigationBar extends Component<Props> {
  handleLeftIconClick = () => {
    this.props.history.push('/');
  };

  render() {
    const routes = [
      {
        title: 'Enregistrer une nouvelle oeuvre',
        path: '/add'
      },
      {
        title: 'Éditer une oeuvre',
        path: '/edit/:id'
      },
      { title: 'Rechercher une oeuvre', path: '/' }
    ];

    return (
      <Switch>
        {routes.map(({ path }) => <Route key={path} path={path} />)}
      </Switch>
    );
  }
}

export default withRouter(NavigationBar);
