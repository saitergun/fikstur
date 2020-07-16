import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

import useMatch from '../hooks/useMatch';

const MatchModal = ({ id, close }) => {
  const match = useMatch(id);

  // remove body scroll
  useEffect(() => {
    document.body.classList.remove('overflow-y-scroll');
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.add('overflow-y-scroll');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (!match) {
    return null;
  }

  return (
    <span className="fixed w-screen h-screen inset-0 flex items-start justify-center p-8 z-50">
      <span className="flex flex-col w-full max-w-sm bg-white rounded-sm shadow-xl z-40">

        <header>
          <ul className="tab-menu w-full border-b pt-5 px-8">
            <li
              className="tab-menu-item active"
            >Maç Bilgisi</li>
          </ul>
        </header>

        {/* <main className="py-4">
          <pre>{JSON.stringify(match, null, 2)}</pre>
        </main> */}

        <main className="py-4">
          {match.date &&
            <time
              className="block text-center"
              dateTime={match.date.format('YYYYY-MM-DDTHH:mmZ')}
            >{match.date.format('D MMMM YYYY dddd, HH.mm')}</time>
          }

          <div
            className={classnames('grid grid-cols-2 py-2', {
              'mt-4': match.date
            })}
          >
            <span className="flex flex-col items-center justify-start">
              <Link
                to={match.home.link}
                title={match.home.name}
              >
                <img
                  style={{
                    width: '48px',
                    height: '48px',
                  }}
                  src={match.home.logo}
                  alt={match.home.name}
                />
              </Link>

              <h3 className="text-lg leading-none mt-3">
                <Link
                  to={match.home.link}
                  title={match.home.nameShort}
                >{match.home.name}</Link>
              </h3>

              {match.score &&
                <h4 className="block text-xl font-semibold mt-2">{match.score.home}</h4>
              }
            </span>

            <span className="flex flex-col items-center justify-start">
              <Link
                to={match.away.link}
                title={match.away.name}
              >
                <img
                  style={{
                    width: '48px',
                    height: '48px',
                  }}
                  src={match.away.logo}
                  alt={match.away.name}
                />
              </Link>

              <h3 className="text-lg leading-none mt-3">
                <Link
                  to={match.away.link}
                  title={match.away.nameShort}
                >{match.away.name}</Link>
              </h3>

              {match.score &&
                <h4 className="block text-xl font-semibold mt-2">{match.score.away}</h4>
              }
            </span>
          </div>
        </main>
      </span>

      <span
        className="absolute w-full h-full inset-0 bg-gray-800 bg-opacity-50 z-30 cursor-pointer"
        onClick={() => close(false)}
      />
    </span>
  );
};

export default MatchModal;