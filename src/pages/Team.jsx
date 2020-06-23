import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classnames from 'classnames';

import { StoreContext } from '../store';

import AppLoader from '../components/AppLoader';

import MatchScoreEditor from '../components/MatchScoreEditor';

const Team = () => {
  const [matches, setMatches] = useState([]);
  const [team, setTeam] = useState(null);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scorePopupMatch, setScorePopupMatch] = useState(null);

  let { id } = useParams();
  id = Number(id);

  const { state } = useContext(StoreContext);

  useEffect(() => {
    const find = state.data.teams.find((team) => team.id === id);

    if (find) {
      setTeam(find);
    }

    const matches = state.data.matches.filter((match) => match.home === id || match.away === id).map((match2) => {
      let result = 'D';
  
      if ((match2.home === id && match2.score[0] > match2.score[1]) || (match2.away === id && match2.score[1] > match2.score[0])) {
        result = 'W';
      }
  
      if ((match2.home === id && match2.score[1] > match2.score[0]) || (match2.away === id && match2.score[0] > match2.score[1])) {
        result = 'L';
      }
  
      const userScoreFind = state.data.userScores.find((m) => m.match === match2.id);

      return {
        ...match2,
        userScore: userScoreFind ? userScoreFind.score : null,
        home_team_name: state.data.teams.find((team) => team.id === match2.home).name_short,
        away_team_name: state.data.teams.find((team) => team.id === match2.away).name_short,
        result,
      }
    });

    setMatches(matches);
  }, [id, state]);

  if (!team) {
    return (
      <AppLoader />
    );
  }

  if (team) {
    return (
      <>
        <main className="sm:max-w-lg py-4 mx-auto">
          <header className="flex flex-col bg-white border-t border-b sm:border border-gray-200 sm:rounded p-4">
            <span className="flex flex-row items-center space-x-4">
              <img
                className="block w-16 h-16"
                src={require(`../media/teams/logos/120x120/${team.id}.png`)}
                alt={team.name}
              />

              <span className="block">
                <h1 className="text-2xl font-semibold">{team.name}</h1>
                <h3 className="text-sm text-gray-500">{team.name_tff}</h3>
              </span>
            </span>

            {/* <span className="flex mt-4">
              <button
                className={classnames('flex items-center justify-center border rounded leading-none py-2 px-3', {
                  'space-x-2': isMyTeam
                })}
                onClick={() => dispatch({ type: 'SET_MY_TEAM', payload: !isMyTeam ? id : null, })}
              >
                {isMyTeam &&
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />

                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                }

                <span className="block">Benim Takımım</span>
              </button>
            </span> */}
          </header>

          <main className="bg-white border-t border-b sm:border border-gray-200 sm:rounded mt-4">
            <ul>
              <li className="flex items-center justify-between rounded-t-lg border-b-2 border-gray-200 py-3 px-4">
                <span className="block leading-none font-semibold">İç Saha</span>

                <span className="block leading-none font-semibold">Deplasman</span>
              </li>

              {matches.map((match, index) =>
                <li className={classnames('flex flex-row items-center py-2 px-2', {
                  'flex-row-reverse': match.home !== id,
                  'border-t border-gray-200': index > 0,
                })} key={match.id}>
                  <span className="block px-2">
                    {(!match.userScore || match.score.length > 0) &&
                      <button
                        disabled={match.score.length > 0}
                        className={classnames('w-8 h-6 leading-none font-medium text-white text-sm rounded-sm shadow', {
                          'bg-gray-500': match.score.length === 0,
                          'bg-green-500 cursor-default': match.score.length > 0 && match.result === 'W',
                          'bg-yellow-500 cursor-default': match.score.length > 0 && match.result === 'D',
                          'bg-red-500 cursor-default': match.score.length > 0 && match.result === 'L',
                        })}
                        onClick={() => { setScorePopupMatch(match); setShowScorePopup(true); }}
                      >{match.score.length > 0 ? `${match.score[0]}·${match.score[1]}` : '+'}</button>
                    }

                    {match.userScore && match.userScore.length > 0 && match.score.length === 0 &&
                      <button
                        className={classnames('w-8 h-6 leading-none font-medium text-white text-sm rounded-sm shadow cursor-pointer', {
                          'bg-green-500': match.userScore.length > 0 && ((match.home === id && match.userScore[0] > match.userScore[1]) || (match.away === id && match.userScore[1] > match.userScore[0])),
                          'bg-yellow-500': match.userScore.length > 0 && match.userScore[0] === match.userScore[1],
                          'bg-red-500': match.userScore.length > 0 && ((match.home === id && match.userScore[1] > match.userScore[0]) || (match.away === id && match.userScore[0] > match.userScore[1])),
                        })}
                        onClick={() => { setScorePopupMatch(match); setShowScorePopup(true); }}
                      >{`${match.userScore[0]}·${match.userScore[1]}`}</button>
                    }
                  </span>

                  <span className="block px-2">
                    <img
                      className="block h-5 max-w-full"
                      src={require(`../media/teams/logos/120x120/${match.home === id ? match.away : match.home}.png`)}
                      alt={match.home === id ? match.away_team_name : match.home_team_name}
                    />
                  </span>

                  <span className="block">
                    {match.home === id ? match.away_team_name : match.home_team_name}
                  </span>

                  <span className={classnames('block px-2 flex-grow', {
                    'text-right': match.home === id,
                    'text-left': match.home !== id
                  })}>
                  </span>
                </li>
              )}
            </ul>
          </main>
        </main>

        {showScorePopup &&
          <MatchScoreEditor match={scorePopupMatch} setShowScorePopup={setShowScorePopup} />
        }
      </>
    );
  }
};

export default Team;
