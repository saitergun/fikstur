import React, { useState, useEffect } from 'react';

import classnames from 'classnames';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.min.css';

import useMatches from '../hooks/useMatches';
import useTeams from '../hooks/useTeams';

dayjs.extend(advancedFormat);

registerLocale('tr', tr);

const PageEditor = () => {
  const [matches, setMatches] = useState(null);

  const teams = useTeams();
  const matchesRaw = useMatches(20192020);

  // set matches
  useEffect(() => {
    if (matches === null && matchesRaw.length) {
      const rows = matchesRaw.map((match) => ([
        match.id,
        match.season,
        match.week,
        match.home,
        match.away,
        match.score ? match.score.home : null,
        match.score ? match.score.away : null,
        match.date.format('YYYY-MM-DD HH:mm')
      ]));

      setMatches({
        columns: ['id', 'season', 'week', 'home', 'away', 'homeScore', 'awayScore', 'datetime'],
        rows,
        updatedAt: '2020-07-06 16:10'
      });
    }
  }, [matchesRaw, matches]);

  const updateHomeTeamScore = (id, score) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const match = matchesCopy.rows.find((row) => row[0] === id);

    if (match) {
      if (score === '' || score === null) {
        match[5] = null;
      } else {
        match[5] = Number(score);
      }
    }

    setMatches(matchesCopy);
  };

  const updateAwayTeamScore = (id, score) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const match = matchesCopy.rows.find((row) => row[0] === id);

    if (match) {
      if (score === '' || score === null) {
        match[6] = null;
      } else {
        match[6] = Number(score);
      }
    }

    setMatches(matchesCopy);
  };

  const updateMatchDate = (id, date) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm');

    const match = matchesCopy.rows.find((row) => row[0] === id);

    if (match) {
      match[7] = date;
    }

    setMatches(matchesCopy);
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <textarea
        className="w-full h-48 p-4 font-mono"
        value={JSON.stringify(matches)}
        onChange={(e) => console.log(e.target)}
      />

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-1">id</th>
            <th className="border px-4 py-1">season</th>
            <th className="border px-4 py-1">week</th>
            <th className="border px-4 py-1">home</th>
            <th className="border px-4 py-1">away</th>
            <th className="border px-4 py-1">homeScore</th>
            <th className="border px-4 py-1">awayScore</th>
            <th className="border px-4 py-1">date</th>
          </tr>
        </thead>

        <tbody>
          {matches && matches.rows.map(([id, season, week, home, away, homeScore, awayScore, date], index) => {
            return (
              <tr key={id} className={classnames({
                'bg-yellow-100': !(week % 2),
                'border-t-4': index > 0 && matches.rows[index - 1][1] !== week
              })}>
                <td className="border px-4 py-1">{id}</td>
                <td className="border px-4 py-1">{season}</td>
                <td className="border px-4 py-1">{week}</td>
                <td className="border px-4 py-1">{teams && teams.find((team) => team.id === home).name}</td>
                <td className="border px-4 py-1">{teams && teams.find((team) => team.id === away).name}</td>
                <td className="border px-4 py-1">
                  <input
                    className="w-12 border rounded px-1"
                    type="number"
                    value={homeScore ?? ''}
                    onChange={(e) => updateHomeTeamScore(id, e.target.value)}
                  />
                </td>
                <td className="border px-4 py-1">
                  <input
                    className="w-12 border rounded px-1"
                    type="number"
                    value={awayScore ?? ''}
                    onChange={(e) => updateAwayTeamScore(id, e.target.value)}
                  />
                </td>
                <td className="border px-4 py-1">
                  <DatePicker
                    className="w-full bg-gray-200 px-2 rounded-lg cursor-pointer"
                    id="birthday"
                    popperPlacement="bottom-end"
                    locale="tr"
                    selected={date ? new Date(date) : null}

                    dateFormat="yyyy-MM-dd HH:mm"

                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"

                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={5}

                    onChange={(date) => updateMatchDate(id, dayjs(date).format('YYYY-MM-DD HH:mm'))}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  );
};

export default PageEditor;
