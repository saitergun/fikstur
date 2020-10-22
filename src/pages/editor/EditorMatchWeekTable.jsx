/* eslint-disable no-unused-vars */
import React from 'react';
import classnames from 'classnames';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import EditorMatchWeekTableRow from './EditorMatchWeekTableRow';

dayjs.extend(advancedFormat);

const EditorMatchWeekTable = ({ matches, setMatch }) => {
  const sortMatches = (a, b) => a[7] && b[7] ? dayjs(a[7]).format('X') - dayjs(b[7]).format('X') : 0;

  return (
    <table
      className={classnames('w-full bg-white table-auto', {
        // 'mt-8': matches[0][2] > 1
      })}
    >
      <thead>
        <tr>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs" colSpan="8">week {matches[0][2]}</th>
        </tr>

        <tr>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs">id</th>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs">home</th>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs">away</th>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs">HS</th>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs">AS</th>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs">date</th>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs">others</th>
          <th className="border px-4 py-1 bg-gray-100 leading-none text-xs"></th>
        </tr>
      </thead>

      <tbody>
        {matches?.length > 0 && matches.sort(sortMatches).map(([id, season, week, home, away, homeScore, awayScore, date, others]) => {
          return (
            <EditorMatchWeekTableRow
              key={id}
              match={{id, season, week, home, away, homeScore, awayScore, date, others}}
              setMatch={(match) => setMatch(match)}
            />
          )
        })}

      </tbody>
    </table>
  );
};

export default EditorMatchWeekTable;
