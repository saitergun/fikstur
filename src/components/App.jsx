/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useTeams from '../hooks/useTeams';
import useMatches from '../hooks/useMatches';

import AppLoader from './AppLoader';
import AppNavbar from './AppNavbar';

import Editor from '../pages/Editor';
import Fixture from '../pages/Fixture';
import Table from '../pages/Table';
import Team from '../pages/Team';

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const teams = useTeams();
  const matches = useMatches(state.data.season);

  // set matches
  useLayoutEffect(() => {
    if (state.data.matches.length === 0 && matches.length !== 0) {
      dispatch({ type: 'SET_MATCHES', payload: matches });
    }
  }, [dispatch, matches, state.data.matches.length]);

  // set teams
  useLayoutEffect(() => {
    if (state.data.teams.length === 0 && teams.length !== 0) {
      dispatch({ type: 'SET_TEAMS', payload: teams });
    }
  }, [dispatch, teams, state.data.teams.length]);

  // set app loading status
  useLayoutEffect(() => {
    if (state.data.teams.length && state.data.matches.length) {
      dispatch({ type: 'SET_APP_LOADING_STATUS', payload: false });
    }
  }, [dispatch, state.data.matches.length, state.data.teams.length]);

  useEffect(() => {
    document.title = 'Yükleniyor';
  }, []);

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
