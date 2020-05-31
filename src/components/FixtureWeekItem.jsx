import React, { useContext, useState } from 'react';
import classnames from 'classnames';

import moment from 'moment';
import 'moment/locale/tr';

import { StoreContext } from '../store';

import useUserScore from '../hooks/useUserScore';

import MatchScoreEditor from './MatchScoreEditor';

const FixtureWeekItem = ({ match }) => {
  const [showScorePopup, setShowScorePopup] = useState(false);

  const { state } = useContext(StoreContext);
  const { teams } = state.data;

  const userScore = useUserScore(match.id);

  const isPlayed = match.score.length > 0;

  const homeTeamName = teams.find((team) => team.id === match.home).name_short;
  const awayTeamName = teams.find((team) => team.id === match.away).name_short;

  const homeTeamLogo = require(`../media/teams/logos/120x120/${match.home}.png`);
  const awayTeamLogo = require(`../media/teams/logos/120x120/${match.away}.png`);

  const date = moment(match.date).format('D MMM — ddd');
  const time = moment(match.date).format('HH.mm');

  return (
    <span className={classnames('w-full flex flex-col space-y-3 p-3')}>
      <span className="flex items-center justify-start">
        <span
          className="flex items-center justify-center leading-none text-sm text-gray-500"
        >{time !== '00.00' ? `${date} ${time}` : date}</span>
      </span>

      <span className="w-full flex items-center justify-between">
        <span className="flex flex-col space-y-1">
          <span className={classnames('flex flex-row items-center space-x-2', {
            'font-semibold': isPlayed && match.score[0] > match.score[1]
          })}>
            <img className="block w-5 h-5" src={homeTeamLogo} alt={homeTeamName} />

            <h3 className="block truncate">{homeTeamName}</h3>
          </span>

          <span className={classnames('flex flex-row items-center space-x-2', {
            'font-semibold': isPlayed && match.score[1] > match.score[0], 
          })}>
            <img className="block w-5 h-5" src={awayTeamLogo} alt={awayTeamName} />

            <h3 className="block truncate">{awayTeamName}</h3>
          </span>
        </span>

        <span className="flex items-center justify-center ml-2">
          {!userScore &&
            <button
              disabled={isPlayed}
              className={classnames('w-7 h-7 leading-none font-medium text-white text-sm rounded-sm shadow', {
                'bg-purple-500 cursor-default': isPlayed,
                'bg-gray-500': !isPlayed
              })}
              onClick={() => setShowScorePopup(true)}
            >{isPlayed ? `${match.score[0]}·${match.score[1]}` : '+'}</button>
          }

          {userScore && userScore.length &&
            <button
              className="w-7 h-7 leading-none font-medium text-white text-sm rounded-sm shadow bg-pink-500 cursor-pointer"
              onClick={() => setShowScorePopup(true)}
            >{`${userScore[0]}·${userScore[1]}`}</button>
          }

          {showScorePopup &&
            <MatchScoreEditor match={match} setShowScorePopup={setShowScorePopup} />
          }
        </span>
      </span>
    </span>
  );
};

export default FixtureWeekItem;
