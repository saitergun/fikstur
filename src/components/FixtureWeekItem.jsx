import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/tr';

import useMatch from '../hooks/useMatch';

import MatchModal from './MatchModal';

dayjs.locale('tr');
dayjs.extend(isYesterday);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const FixtureWeekMatchItem = ({ id, isLastMatch, showMatchDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [dayText, setDayText] = useState(null);

  const match = useMatch(id);

  useEffect(() => {
    if (match?.date) {
      if (dayjs(match.date).isYesterday()) {
        setDayText('Dün');
      } else if (dayjs(match.date).isToday()) {
        setDayText('Bugün');
      } else if (dayjs(match.date).isTomorrow()) {
        setDayText('Yarın');
      } else {
        setDayText(dayjs(match.date).format('dddd / D MMM'));
      }
    }
  }, [match]);

  if (!match) {
    return null;
  }

  return (
    <div className={classnames({
      'border-b border-gray-200': !isLastMatch,
      'sm:rounded': isLastMatch,
      'flex flex-col': showMatchDate,
    })}>
      {showMatchDate &&
        <div className="flex items-center justify-center text-gray-500 text-xs leading-none pt-1 px-4">
          {dayText}
        </div>
      }

      <div className="flex">
        <div className="w-1/2 h-10 flex items-center justify-end space-x-3">
          <Link
            to={match.home.link}
            title={match.home.nameShort}
          >{match.home.name}</Link>

          <Link
            to={match.home.link}
            title={match.home.name}
          >
            <img
              style={{
                width: '24px',
                height: '24px',
              }}
              src={match.home.logo}
              alt={match.home.name}
            />
          </Link>
        </div>

        <div className="w-24 h-10 flex flex-grow items-center justify-center">
          <button
            className={classnames('w-12 h-6 flex items-center justify-center leading-none rounded-sm bg-white', {
              'text-white bg-purple-500 font-medium shadow': !match.result && match.score,
              'border font-medium': !match.result && !match.score,
              'text-white bg-green-500': match.result && match.result === 'W',
              'text-white bg-yellow-500': match.result && match.result === 'D',
              'text-white bg-red-500': match.result && match.result === 'L',
            })}
            onClick={() => setShowModal(match.id)}
          >{match.score ? `${match.score.home}·${match.score.away}` : match.date ? match.date.format('HH.mm') : '-'}</button>
        </div>

        <div className="w-1/2 h-10 flex items-center justify-start space-x-3">
          <Link
            to={match.away.link}
            title={match.away.name}
          >
            <img
              style={{
                width: '24px',
                height: '24px',
              }}
              src={match.away.logo}
              alt={match.away.name}
            />
          </Link>

          <Link
            to={match.away.link}
            title={match.away.nameShort}
          >{match.away.name}</Link>
        </div>
      </div>

      {showModal &&
        <MatchModal id={id} close={setShowModal} />
      }
    </div>
  );
};

export default FixtureWeekMatchItem;
