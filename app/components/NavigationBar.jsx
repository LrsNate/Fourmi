import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Home from 'material-ui/svg-icons/action/home';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { history } from 'react-router-prop-types';

class NavigationBar extends Component {
  static propTypes = {
    history: history.isRequired
  };

  constructor(props) {
    super(props);
    this.handleLeftIconClick = this.handleLeftIconClick.bind(this);
  }

  handleLeftIconClick() {
    this.props.history.push('/');
  }

  render() {
    const routes = [
      {
        title: 'Enregistrer une nouvelle oeuvre',
        path: '/add',
        icon: <NavigationClose />
      },
      {
        title: 'Éditer une oeuvre',
        path: '/edit/:id',
        icon: <NavigationClose />
      },
      { title: 'Rechercher une oeuvre', path: '/', icon: <Home /> }
    ];

    return (
      <Switch>
        {routes.map(({ title, path, icon }) =>
          <Route
            key={path}
            path={path}
            render={() =>
              <AppBar
                title={title}
                iconElementLeft={
                  <IconButton onClick={this.handleLeftIconClick}>
                    {icon}
                  </IconButton>
                }
              />}
          />
        )}
      </Switch>
    );
  }
}

export default withRouter(NavigationBar);
