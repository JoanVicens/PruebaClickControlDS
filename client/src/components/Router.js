import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import List from './List/';
import Navigation from './Navigation/';
import Details from './Details/';
import AddBook from './AddBook/';

class Router extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/list" component={List} />
          <Route exact path="/add" component={AddBook} />
          <Route exact path="/details/:isbn" component={Details} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
