import React, { useContext, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { StoreContext } from '../store';

import AppLoader from './AppLoader';
import AppNavbar from './AppNavbar';

import Fixture from '../pages/Fixture';
import Table from '../pages/Table';
import Team from '../pages/Team';

const App = () => {
  const { state, setState } = useContext(StoreContext);

  const { teams, matches } = state.data;

  // set matches
  useEffect(() => {
    if (matches.length === 0) {
      import('../data/matches/20192020').then((response) => {
        setState({ type: 'PUSH_MATCHES', payload: response.default });
      });
    }
  }, [setState, matches.length]);

  // set teams
  useEffect(() => {
    if (teams.length === 0) {
      import('../data/teams').then((response) => {
        setState({ type: 'PUSH_TEAMS', payload: response.default });
      });
    }
  }, [setState, teams.length]);

  // set app loading status
  useEffect(() => {
    if (teams.length && matches.length) {
      setState({ type: 'SET_APP_LOADING_STATUS', payload: false });
    }
  }, [setState, teams.length, matches.length]);

  return (
    <>
      {state.app.loading && <AppLoader />}

      {!state.app.loading &&
        <>
          <AppNavbar />

          <Switch>
            <Route path='/fixture' component={Fixture} />
            <Route path='/table' component={Table} />
            <Route path='/team/:id' component={Team} />

            <Route path='/'>
              <Redirect to="/fixture" />
            </Route>

            <Route>
              <Redirect to="/fixture" />
            </Route>
          </Switch>
        </>
      }
    </>
  );
};

export default App;
