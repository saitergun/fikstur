import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import classnames from 'classnames';
import isEqual from 'lodash.isequal';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.min.css';

import TeamSelector from './TeamSelector';

dayjs.extend(advancedFormat);

registerLocale('tr', tr);

const EditorMatchWeekTableRow = ({ match, setMatch }) => {
  const [localeMatch, setLocaleMatch] = useState(match ? {...match} : null);
  const [isUpdated, setIsUpdated] = useState(false);

  const teams = useSelector(state => state.data.teams);

  useEffect(() => {
    const equal = isEqual(JSON.stringify(match), JSON.stringify(localeMatch));

    setIsUpdated(!equal);
  }, [match, localeMatch]);

  const updateMatchPostponeStatus = (e) => {
    if (e.currentTarget.checked) {
      setLocaleMatch({
        ...localeMatch,
        others: {
          postponed: true,
        }
      });
    } else {
      const { others, ...properties } = localeMatch;

      setLocaleMatch(properties);
    }
  };

  if (!localeMatch) {
    return null;
  }

  return (
    <>
      <tr>
        <td className="border text-center px-2">
          <a
            className="block"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.tff.org/Default.aspx?pageId=29&macId=${localeMatch.id}`}
            tabIndex={-1}
          >{localeMatch.id}</a>
        </td>

        <td className={classnames('border', { 'bg-yellow-200': match.home !== localeMatch.home })}>
          <TeamSelector
            options={teams.map((team) => ({ text: team.name, value: team.id}))}
            selected={localeMatch.home ?? 0}
            onChange={(e) => {
              if (Number(e.target.value) === 0) {
                setLocaleMatch({ ...localeMatch, home: null })
              } else {
                setLocaleMatch({ ...localeMatch, home: Number(e.target.value) })
              }
            }}
          />
        </td>

        <td className={classnames('border', { 'bg-yellow-200': match.away !== localeMatch.away })}>
          <TeamSelector
            options={teams.map((team) => ({ text: team.name, value: team.id}))}
            selected={localeMatch.away ?? 0}
            onChange={(e) => {
              if (Number(e.target.value) === 0) {
                setLocaleMatch({ ...localeMatch, away: null })
              } else {
                setLocaleMatch({ ...localeMatch, away: Number(e.target.value) })
              }
            }}
          />
        </td>

        <td className={classnames('border', { 'bg-yellow-200': match.homeScore !== localeMatch.homeScore })} width="75">
          <input
            className="w-full bg-transparent text-center font-mono px-2"
            type="number"
            value={localeMatch.homeScore ?? ''}
            onChange={(e) => {
              if (Number(e.target.value) < 0) {
                setLocaleMatch({ ...localeMatch, homeScore: null })
              } else {
                setLocaleMatch({ ...localeMatch, homeScore: Number(e.target.value) })
              }
            }}
          />
        </td>

        <td className={classnames('border', { 'bg-yellow-200': match.awayScore !== localeMatch.awayScore })} width="75">
          <input
            className="w-full bg-transparent text-center font-mono px-2"
            type="number"
            value={localeMatch.awayScore ?? ''}
            onChange={(e) => {
              if (Number(e.target.value) < 0) {
                setLocaleMatch({ ...localeMatch, awayScore: null })
              } else {
                setLocaleMatch({ ...localeMatch, awayScore: Number(e.target.value) })
              }
            }}
          />
        </td>

        <td className={classnames('border', { 'bg-yellow-200': match.date !== localeMatch.date })} width="200">
          <span className="flex items-center">
            <DatePicker
              className="w-full bg-transparent px-2 cursor-pointer font-mono text-gray-700"
              id={`match-${localeMatch.id}`}
              popperPlacement="bottom-end"
              locale="tr"
              selected={localeMatch.date ? new Date(localeMatch.date) : null}

              dateFormat="yyyy-MM-dd HH:mm"

              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"

              showTimeSelect
              timeFormat="p"
              timeIntervals={5}

              tabIndex={-1}

              onChange={(date) => setLocaleMatch({ ...localeMatch, date: dayjs(date).format('YYYY-MM-DD HH:mm') })}
            />

            {localeMatch.date !== null &&
              <button
                className="active:bg-gray-200 shadow-xs rounded-sm leading-none text-xs ml-1 py-1 px-2"
                onClick={() => setLocaleMatch({ ...localeMatch, date: null })}
              >X</button>
            }
          </span>
        </td>

        <td className="border" width="75">
          <span className="p-1">
            <label className={classnames('inline-flex items-center justify-center space-x-2 cursor-pointer select-none p-1', {
              'bg-yellow-200': match?.others?.postponed !== localeMatch?.others?.postponed 
            })}>
              <input
                type="checkbox"
                checked={localeMatch?.others?.postponed ?? false}
                value={true}
                onChange={updateMatchPostponeStatus}
              />

              <span className="inline-block leading-none text-sm">ERT.</span>
            </label>
          </span>
        </td>

        <td className={classnames('border text-center')} width="160">
          <button
            className={classnames('active:bg-gray-200 shadow-xs rounded-sm leading-none text-xs m-1 py-1 px-2 focus:outline-none', {
              'bg-gray-100 text-gray-400 cursor-not-allowed': !isUpdated
            })}
            disabled={!isUpdated}
            onClick={() => setLocaleMatch({...match})}
          >VAZGEÇ</button>

          <button
            className={classnames('active:bg-gray-200 shadow-xs rounded-sm leading-none text-xs m-1 py-1 px-2 focus:outline-none font-bold', {
              'bg-gray-100 text-gray-400 cursor-not-allowed': !isUpdated
            })}
            disabled={!isUpdated}
            onClick={() => setMatch(localeMatch)}
          >GÜNCELLE</button>
        </td>
      </tr>
    </>
  );
};

export default EditorMatchWeekTableRow;
