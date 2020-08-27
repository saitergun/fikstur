import React, { useState, useEffect } from 'react';

import classnames from 'classnames';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.min.css';

import useMatches from '../hooks/useMatches';
import useTeams from '../hooks/useTeams';

import AppLoader from '../components/AppLoader';

dayjs.extend(advancedFormat);

registerLocale('tr', tr);

const PageEditor = () => {
  const [matches, setMatches] = useState(null);

  const [newRowCount, setNewRowCount] = useState(1);
  const [newRowWeek, setNewRowWeek] = useState(1);
  const [newRowDate, setNewRowDate] = useState(null);

  const teams = useTeams();
  const matchesRaw = useMatches(20202021);

  useEffect(() => {
    document.title = 'Editör';
  }, []);

  // set matches
  useEffect(() => {
    if (matches === null && matchesRaw.length > 0) {
      const rows = matchesRaw.map((match) => ([
        match.id,
        match.season,
        match.week,
        match.home,
        match.away,
        match.score ? match.score.home : null,
        match.score ? match.score.away : null,
        match.date ? match.date.format('YYYY-MM-DD HH:mm') : null
      ]));

      setMatches({
        columns: ['id', 'season', 'week', 'home', 'away', 'homeScore', 'awayScore', 'datetime'],
        rows,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
      });
    }
  }, [matchesRaw, matches]);

  const addNewRow = () => {
    for (let x = 1; x <= newRowCount; x = x+1) {
      const matchesCopy = {...matches};

      const [id] = matchesCopy.rows[matchesCopy.rows.length-1];

      matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

      matchesCopy.rows.push([
        id+1, // id
        20202021, // season
        newRowWeek, // week
        0, // home
        0, // away
        null, // homeScore
        null, // awayScore
        newRowDate // datetime
      ]);

      setMatches(matchesCopy);
    }
  };

  const updateMatchId = (id, newId) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm');

    const match = matchesCopy.rows.find((row) => row[0] === id);

    if (match) {
      match[0] = Number(newId);
    }

    setMatches(matchesCopy);
  };

  const updateMatchWeek = (id, week) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm');

    const match = matchesCopy.rows.find((row) => row[0] === id);

    if (match) {
      match[2] = Number(week);
    }

    setMatches(matchesCopy);
  };

  const updateMatchHomeTeam = (id, teamId) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm');

    const match = matchesCopy.rows.find((row) => row[0] === id);

    if (match) {
      match[3] = Number(teamId);
    }

    setMatches(matchesCopy);
  };

  const updateMatchAwayTeam = (id, teamId) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm');

    const match = matchesCopy.rows.find((row) => row[0] === id);

    if (match) {
      match[4] = Number(teamId);
    }

    setMatches(matchesCopy);
  };

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

  // ['id', 'season', 'week', 'home', 'away', 'homeScore', 'awayScore', 'datetime']

  if (!matches) {
    return (
      <AppLoader />
    );
  }

  return (
    <main className="max-w-6xl mx-auto mt-4">
      <textarea
        className="w-full h-12 p-1 font-mono text-xs"
        value={JSON.stringify(matches)}
        onChange={(e) => console.log(e.target)}
      />

      <div className="py-4">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-1">count</th>
              <th className="border px-4 py-1">week</th>
              <th className="border px-4 py-1">date</th>
              <th className="border px-4 py-1"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border px-4 py-1">
                <input
                  className="w-20 border rounded px-1"
                  type="number"
                  value={newRowCount}
                  onChange={(e) => setNewRowCount(Number(e.target.value))}
                />
              </td>
              <td className="border px-4 py-1">
                <input
                  className="w-20 border rounded px-1"
                  type="number"
                  value={newRowWeek}
                  onChange={(e) => setNewRowWeek(Number(e.target.value))}
                />
              </td>
              <td className="border px-4 py-1">
                <DatePicker
                  className="w-full bg-gray-200 px-2 rounded-lg cursor-pointer"
                  id="newRowDate"
                  popperPlacement="bottom-end"
                  locale="tr"
                  selected={newRowDate ? new Date(newRowDate) : null}

                  dateFormat="yyyy-MM-dd 00:00"

                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"

                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={5}

                  onChange={(date) => setNewRowDate(dayjs(date).format('YYYY-MM-DD 00:00'))}
                />
              </td>
              <td className="border px-4 py-1">
                <button
                  className="rounded text-purple-100 bg-purple-600 leading-none p-1"
                  onClick={addNewRow}
                >new row</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="py-4">
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
              const homeTeam = teams.find((team) => team.id === home);
              const awayTeam = teams.find((team) => team.id === away);

              return (
                <tr key={id+index} className={classnames({
                  'bg-yellow-100': !(week % 2),
                  'border-t-4': index > 0 && matches.rows[index - 1][1] !== week
                })}>
                  <td className="border px-4 py-1">
                    <input
                      className="w-40 border rounded px-1"
                      type="number"
                      value={id ?? ''}
                      onChange={(e) => updateMatchId(id, e.target.value)}
                      tabIndex={-1}
                    />
                  </td>
                  <td className="border px-4 py-1">{season}</td>
                  <td className="border px-4 py-1">
                    <input
                      className="w-12 border rounded px-1"
                      type="number"
                      value={week ?? ''}
                      onChange={(e) => updateMatchWeek(id, e.target.value)}
                      tabIndex={-1}
                    />
                  </td>
                  <td className="border px-4 py-1">
                    <select value={teams && homeTeam ? homeTeam.id : 0} onChange={(e) => updateMatchHomeTeam(id, e.target.value)}>
                      <option value={0}>-</option>
                      {teams.sort((a, b) => {
                        const nameA = a.name.toLocaleUpperCase('tr-TR');
                        const nameB = b.name.toLocaleUpperCase('tr-TR');

                        if (nameA < nameB) {
                          return -1;
                        }

                        if (nameA > nameB) {
                          return 1;
                        }

                        return 0;
                      }).map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                    </select>
                  </td>
                  <td className="border px-4 py-1">
                    <select value={teams && awayTeam ? awayTeam.id : 0} onChange={(e) => updateMatchAwayTeam(id, e.target.value)}>
                      <option value={0}>-</option>
                      {teams.sort((a, b) => {
                        const nameA = a.name.toLocaleUpperCase('tr-TR');
                        const nameB = b.name.toLocaleUpperCase('tr-TR');

                        if (nameA < nameB) {
                          return -1;
                        }

                        if (nameA > nameB) {
                          return 1;
                        }

                        return 0;
                      }).map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                    </select>
                  </td>
                  <td className="border px-4 py-1">
                    <input
                      className="w-12 border rounded px-1"
                      type="number"
                      value={homeScore ?? ''}
                      onChange={(e) => updateHomeTeamScore(id, e.target.value)}
                      tabIndex={-1}
                    />
                  </td>
                  <td className="border px-4 py-1">
                    <input
                      className="w-12 border rounded px-1"
                      type="number"
                      value={awayScore ?? ''}
                      onChange={(e) => updateAwayTeamScore(id, e.target.value)}
                      tabIndex={-1}
                    />
                  </td>
                  <td className="border px-4 py-1">
                    <DatePicker
                      className="w-full bg-gray-200 px-2 rounded-lg cursor-pointer"
                      id={`match-${id+index}`}
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

                      tabIndex={-1}

                      onChange={(date) => updateMatchDate(id, dayjs(date).format('YYYY-MM-DD HH:mm'))}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PageEditor;
