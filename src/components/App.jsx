import React, { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { StoreContext } from '../store';

import AppLoader from './AppLoader';
import AppNavbar from './AppNavbar';

import Editor from '../pages/Editor';
import Fixture from '../pages/Fixture';
import Table from '../pages/Table';
import Team from '../pages/Team';

const App = () => {
  const { state } = useContext(StoreContext);

  if (state.app.loading) {
    return <AppLoader />;
  }

  return (
    <>
      <AppNavbar />

      <Switch>
        <Route path='/fixture' component={Fixture} />
        <Route path='/table' component={Table} />
        <Route path='/team/:id' component={Team} />

        <Route path='/editor' component={Editor} />

        <Route path='/'>
          <Redirect to="/fixture" />
        </Route>

        <Route>
          <Redirect to="/fixture" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
