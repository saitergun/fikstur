import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useTeam from '../hooks/useTeam';
import useMatch from '../hooks/useMatch';
import useFixture from '../hooks/useFixture';
import useTable from '../hooks/useTable';

const Hooks = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { season } = state.data;

  const team = useTeam(state.data.teams?.[0].id);
  const match = useMatch(state.data.matches?.[0].id);
  const table = useTable(season);
  const fixture = useFixture();

  return (
    <div className="grid grid-cols-2 gap-x-4 p-4">
      <span className="space-y-4">
        <pre className="bg-white border-2 text-xs p-2">state.app {JSON.stringify(state.app, null, 2)}</pre>
        <pre className="bg-white border-2 text-xs p-2">state.data.season {JSON.stringify(state.data.season, null, 2)}</pre>
        <pre className="bg-white border-2 text-xs p-2">state.data.teams {JSON.stringify(state.data?.teams.slice(0, 1), null, 2)}</pre>
        <pre className="bg-white border-2 text-xs p-2">state.data.matches {JSON.stringify(state.data?.matches.filter((m) => m.id === state.data.matches?.[0].id), null, 2)}</pre>

        <button
          className="bg-white border-2 p-2"
          onClick={() => dispatch({ type: 'SET_SEASON', payload: season === 20202021 ? 20192020 : 20202021 })}
        >SET_SEASON</button>
      </span>

      <span className="space-y-4">
        <pre className="bg-white border-2 text-xs p-2">useTeam {JSON.stringify(team, null, 2)}</pre>
        <pre className="bg-white border-2 text-xs p-2">useMatch {JSON.stringify(match, null, 2)}</pre>
        <pre className="bg-white border-2 text-xs p-2">useTable {JSON.stringify(table[0], null, 2)}</pre>
        <pre className="bg-white border-2 text-xs p-2">useFixture {JSON.stringify(fixture.weeks[0]?.[0], null, 2)}</pre>
      </span>
    </div>
  );
};

export default Hooks;
