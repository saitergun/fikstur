import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';

import useTable from '../hooks/useTable';

import AppLoader from '../components/AppLoader';

const PageTable = () => {
  const [week] = useState(26);

  const history = useHistory();

  const table = useTable({ week });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (table.length === 0) {
    return (
      <AppLoader />
    );
  }

  return (
    <div className="sm:max-w-lg overflow-x-scroll no-scrollbar py-4 mx-auto">
      {table.length > 0 &&
        <table className="w-full table-auto bg-white border-t border-b sm:border border-gray-200 rounded">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th colSpan="2" />
              <th className="px-1 py-4 text-left">TAKIM</th>
              <th className="px-1 py-4 text-center">P</th>
              <th className="px-1 py-4 text-center">O</th>
              <th className="px-1 py-4 text-center">G</th>
              <th className="px-1 py-4 text-center">B</th>
              <th className="px-1 py-4 text-center">M</th>
              <th className="px-1 py-4 text-center">AG</th>
              <th className="px-1 py-4 text-center">YG</th>
              <th className="px-1 py-4 text-right pr-3">Av.</th>
            </tr>
          </thead>

          <tbody>
            {table.map((team) =>
              <tr
                className={classnames('hover:bg-gray-100 active:bg-gray-100 cursor-pointer', {
                  'border-t border-gray-200': team.position > 1,
                })}
                onClick={() => {history.push(`/team/${team.id}`)}}
                key={team.position}
              >
                <td className="px-1 py-2 text-center pl-3">{team.position}</td>
                <td className="text-center"><img
                  className="block w-5 max-h-full"
                  src={require(`../media/teams/logos/120x120/${team.id}.png`)}
                  alt={team.nameShort}
                /></td>
                <td className="px-1 py-2 text-left uppercase">{team.nameShort.slice(0, 4)}</td>
                <td className="px-1 py-2 text-center font-semibold">{team.countPoints}</td>
                <td className="px-1 py-2 text-center">{team.countPlayed}</td>
                <td className="px-1 py-2 text-center">{team.countWon}</td>
                <td className="px-1 py-2 text-center">{team.countDrawn}</td>
                <td className="px-1 py-2 text-center">{team.countLost}</td>
                <td className="px-1 py-2 text-center">{team.countGoalsFor}</td>
                <td className="px-1 py-2 text-center">{team.countGoalsAgainst}</td>
                <td className="px-1 py-2 text-right pr-3">{team.countGoalsDifference > 0 ? '+' : ''}{team.countGoalsDifference}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  );
};

export default PageTable;
