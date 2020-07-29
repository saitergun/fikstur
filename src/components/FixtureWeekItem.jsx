import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

import MatchModal from './MatchModal';
import TeamLogo from './TeamLogo';

const FixtureWeekMatchItem = ({ match, isLastMatch, showMatchDate }) => {
  const [showModal, setShowModal] = useState(false);

  if (!match) {
    return null;
  }

  return (
    <div className={classnames({
      'border-b border-gray-200': !isLastMatch,
      'sm:rounded': isLastMatch,
      'flex flex-col': showMatchDate,
    })}>
      {match.date && showMatchDate &&
        <div className="flex items-center justify-center text-gray-500 text-xs leading-none pt-1 px-4">
          {match.date && match.date.isYesterday && <>Dün</>}
          {match.date && match.date.isToday && <>Bugün</>}
          {match.date && match.date.isTomorrow && <>Yarın</>}

          {match.date && !match.date.isYesterday && !match.date.isToday && !match.date.isTomorrow && <>{
            `${match.date.dddd} / ${match.date.D} ${match.date.MMM}`
          }</>}
        </div>
      }

      <div className="flex">
        <div className="w-1/2 h-10 flex items-center justify-end space-x-3">
          <Link
            to={match.home.link}
            title={match.home.name}
          >{match.home.nameShort}</Link>

          <TeamLogo
            src={match.home.logo}
            title={match.home.name}
            href={match.home.link}
          />
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
          >{match.score ? `${match.score.home}·${match.score.away}` : match.date ? `${match.date.HH}.${match.date.mm}` : '-'}</button>
        </div>

        <div className="w-1/2 h-10 flex items-center justify-start space-x-3">
          <TeamLogo
            src={match.away.logo}
            title={match.away.name}
            href={match.away.link}
          />

          <Link
            to={match.away.link}
            title={match.away.name}
          >{match.away.nameShort}</Link>
        </div>
      </div>

      {showModal &&
        <MatchModal id={match.id} close={setShowModal} />
      }
    </div>
  );
};

export default FixtureWeekMatchItem;
