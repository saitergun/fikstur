import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import moment from 'moment';
import 'moment/locale/tr';

import { StoreContext } from '../store';

import useUserScore from '../hooks/useUserScore';

const MatchScoreEditor = ({ match, setShowScorePopup }) => {
  const [userScoreHome, setUserScoreHome] = useState(0);
  const [userScoreAway, setUserScoreAway] = useState(0);

  const { state, dispatch } = useContext(StoreContext);

  const userScore = useUserScore(match.id);

  useEffect(() => {
    if (userScore && userScore.length) {
      setUserScoreHome(userScore[0]);
      setUserScoreAway(userScore[1]);
    }
  }, [userScore]);

  useEffect(() => {
    document.body.classList.remove('overflow-y-scroll');
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.add('overflow-y-scroll');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const date = moment(match.date).format('D MMMM dddd');
  const time = moment(match.date).format('HH.mm');

  const homeTeamName = state.data.teams.find((team) => team.id === match.home).name_short;
  const awayTeamName = state.data.teams.find((team) => team.id === match.away).name_short;

  const homeTeamLogo = require(`../media/teams/logos/120x120/${match.home}.png`);
  const awayTeamLogo = require(`../media/teams/logos/120x120/${match.away}.png`);

  const setUserScore = () => {
    dispatch({
      type: 'SET_USER_SCORE',
      payload: {
        match: match.id,
        score: [Number(userScoreHome), Number(userScoreAway)],
      }
    });

    setShowScorePopup(false);
  };

  const removeUserScore = () => {
    dispatch({ type: 'REMOVE_USER_SCORE', payload: match.id });

    setShowScorePopup(false);
  };

  return (
    <span className="fixed w-screen h-screen inset-0 flex items-start justify-center p-8 z-50">
      <span className="flex flex-col w-full max-w-sm bg-white rounded-sm shadow-xl z-40">
        <header className="flex items-center justify-between border-b-4 border-gray-200 py-3 px-4">
          <h3 className="block font-semibold leading-none">SKOR DÜZENLE</h3>

          <span className="block">{`${match.week}. hafta`}</span>
        </header>

        <main className="py-4 px-3">
          <section className="flex items-center justify-center">
            <span className="flex items-center justify-center leading-none text-gray-500"
            >{time !== '00.00' ? `${date}, ${time}` : date}</span>
          </section>

          <section className="grid grid-cols-2 divide-x divide-gray-200 mt-5">
            <span className="flex flex-col items-center justify-start">
              <Link to={`/team/${match.home}`}>
                <img className="block w-8 h-8" src={homeTeamLogo} alt={homeTeamName} />
              </Link>

              <Link to={`/team/${match.home}`}>
                <h3 className="block truncate mt-1">{homeTeamName}</h3>
              </Link>

              <h4 className="block text-lg font-semibold">{userScoreHome ?? '-'}</h4>

              <span className="flex items-center justify-center space-x-2 mt-4">
                <button
                  disabled={userScoreHome === 0}
                  className={classnames('flex items-center justify-center w-8 h-8 border rounded-lg leading-none text-center text-2xl', {
                    'bg-gray-100 border-gray-200': userScoreHome === 0,
                  })}
                  onClick={() => setUserScoreHome(userScoreHome - 1)}
                >-</button>

                <button
                  disabled={userScoreHome > 98}
                  className={classnames('flex items-center justify-center w-8 h-8 border rounded-lg leading-none text-center text-2xl', {
                    'bg-gray-100 border-gray-200': userScoreHome > 98,
                  })}
                  onClick={() => setUserScoreHome(userScoreHome + 1)}
                >+</button>
              </span>
            </span>

            <span className="flex flex-col items-center justify-start">
              <Link to={`/team/${match.away}`}>
                <img className="block w-8 h-8" src={awayTeamLogo} alt={awayTeamName} />
              </Link>

              <Link to={`/team/${match.away}`}>
                <h3 className="block truncate mt-1">{awayTeamName}</h3>
              </Link>

              <h4 className="block text-lg font-semibold">{userScoreAway ?? '-'}</h4>

              <span className="flex items-center justify-center space-x-2 mt-4">
                <button
                  disabled={userScoreAway === 0}
                  className={classnames('flex items-center justify-center w-8 h-8 border rounded-lg leading-none text-center text-2xl', {
                    'bg-gray-100 border-gray-200': userScoreAway === 0,
                  })}
                  onClick={() => setUserScoreAway(userScoreAway - 1)}
                >-</button>

                <button
                  disabled={userScoreAway > 98}
                  className={classnames('flex items-center justify-center w-8 h-8 border rounded-lg leading-none text-center text-2xl', {
                    'bg-gray-100 border-gray-200': userScoreAway > 98,
                  })}
                  onClick={() => setUserScoreAway(userScoreAway + 1)}
                >+</button>
              </span>
            </span>
          </section>
        </main>

        <footer className="flex flex-row items-center justify-center border-t-4 border-gray-200 space-x-3 py-3 p-4">
          {!userScore &&
            <button
              className="w-full active:bg-gray-100 leading-none py-2"
              onClick={() => setShowScorePopup(false)}
            >Vazgeç</button>
          }

          {userScore &&
            <button
              className="w-full active:bg-gray-100 leading-none py-2"
              onClick={() => removeUserScore()}
            >Sil</button>
          }

          <button
            className={classnames('w-full bg-purple-600 active:bg-purple-700 rounded leading-none text-white py-2')}
            onClick={() => setUserScore()}
          >Düzenle</button>
        </footer>
      </span>

      <span className="absolute w-full h-full inset-0 bg-gray-800 bg-opacity-50 z-30 cursor-pointer" onClick={() => setShowScorePopup(false)} />
    </span>
  );
};

export default MatchScoreEditor;