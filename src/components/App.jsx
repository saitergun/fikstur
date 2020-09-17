import React, { useState, useLayoutEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useFetchMatches from '../hooks/useFetchMatches';
import useFetchTeams from '../hooks/useFetchTeams';

import AppLoader from './AppLoader';
import AppNavbar from './AppNavbar';

import Editor from '../pages/editor/Index';
import Fixture from '../pages/fixture/Index';
import Table from '../pages/table/Index';
import Team from '../pages/Team';
import Hooks from '../pages/Hooks';

const App = () => {
  const [matchesLoaded, setMatchesLoaded] = useState(false);
  const [teamsLoaded, setTeamsLoaded] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const matches = useFetchMatches(state.data.season);
  const teams = useFetchTeams();

  useLayoutEffect(() => {
    setMatchesLoaded(false);
  }, [state.data.season]);

  useLayoutEffect(() => {
    if (!matchesLoaded && matches.length > 0) {
      dispatch({ type: 'SET_MATCHES', payload: matches });

      setMatchesLoaded(true);
    }
  }, [dispatch, matches, matchesLoaded]);

  useLayoutEffect(() => {
    if (!teamsLoaded && teams.length > 0) {
      dispatch({ type: 'SET_TEAMS', payload: teams });

      setTeamsLoaded(true);
    }
  }, [dispatch, teams, teamsLoaded]);

  if (!matchesLoaded || !teamsLoaded) {
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
        <Route path='/hooks' component={Hooks} />

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
