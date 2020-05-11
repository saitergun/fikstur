import React, { useContext, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { StoreContext } from '../store';

import AppLoader from './AppLoader';
import AppNavbar from './AppNavbar';

import Fixture from '../pages/Fixture';
import Table from '../pages/Table';
import Team from '../pages/Team';

const App = () => {
  const { state, dispatch } = useContext(StoreContext);

  const { loading } = state.app;

  const { teams, matches } = state.data;

  // set user scores
  useEffect(() => {
    const savedScores = localStorage.getItem('fixture-saved:user-scores');

    if (savedScores) {
      const savedScoresParsed = JSON.parse(savedScores);

      savedScoresParsed.forEach((payload) => {
        dispatch({ type: 'SET_USER_SCORE', payload, });
      });
    }
  }, [dispatch]);

  // set teams
  useEffect(() => {
    if (teams.length === 0) {
      import('../data/teams').then((response) => {
        // console.log("import('../data/teams')");

        dispatch({ type: 'PUSH_TEAMS', payload: response.default, });
      });
    }
  }, [dispatch, teams.length]);

  // set matches
  useEffect(() => {
    if (matches.length === 0) {
      import('../data/matches/20192020').then((response) => {
        // console.log("import('../data/matches/20192020')");

        dispatch({ type: 'PUSH_MATCHES', payload: response.default, });
      });
    }
  }, [dispatch, matches.length]);

  // set app loading status
  useEffect(() => {
    if (teams.length && matches.length) {
      dispatch({ type: 'SET_APP_LOADING_STATUS', payload: false, });
    }
  }, [dispatch, teams.length, matches.length]);

  return (
    <>
      {loading && <AppLoader />}

      {!loading &&
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
