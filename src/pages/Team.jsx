import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import classnames from 'classnames';

import useTeam from '../hooks/useTeam';
import useTeamFixture from '../hooks/useTeamFixture';

import MatchModal from '../components/MatchModal';
import TeamLogo from '../components/TeamLogo';

const PageTeam = () => {
  const [showModal, setShowModal] = useState(false);

  let { id } = useParams();
  id = Number(id);

  const team = useTeam(id);
  const fixture = useTeamFixture(id);

  // scroll to top when first load
  useEffect(() => window.scrollTo(0, 0), [id]);

  useEffect(() => {
    if (team?.name) {
      document.title = team.name;
    }
  }, [team]);

  if (!id || !team) {
    return (
      <main className="sm:max-w-lg py-4 mx-auto text-center">
        aradığın takım burada yok.
      </main>
    )
  }

  return (
    <>
      <main className="sm:max-w-lg py-4 mx-auto">
        <header className="flex flex-row items-center space-x-4 bg-white border-t border-b sm:border border-gray-200 sm:rounded p-4">
          <TeamLogo
            src={team.logo}
            title={team.name}
            size="lg"
          />

          <span className="block">
            <h1 className="text-3xl font-semibold">{team.name}</h1>

            {team.name !== team.nameTff &&
              <h3 className="text-gray-700">{team.nameTff}</h3>
            }
          </span>
        </header>

        <main className="bg-white border-t border-b sm:border border-gray-200 sm:rounded mt-4">
          <ul>
            {fixture.length > 0 && fixture.map((match, index) =>
              <li className={classnames('flex flex-row items-center justify-between py-2 px-4 space-x-3', {
                'flex-row-reverse space-x-reverse': match.isAway,
                'border-t border-gray-200': index > 0,
              })} key={match.id}>
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

                <TeamLogo
                  src={match.team.logo}
                  title={match.team.name}
                  href={match.team.link}
                />

                <Link
                  to={match.team.link}
                  title={match.team.nameTff}
                >{match.team.name}</Link>

                <span className={classnames('block flex-grow', {
                  'text-right': match.isHome,
                  'text-left': match.isAway,
                })}></span>
              </li>
            )}
          </ul>
        </main>
      </main>

      {showModal &&
        <MatchModal id={showModal} close={setShowModal} />
      }
    </>
  );
};

export default PageTeam;
