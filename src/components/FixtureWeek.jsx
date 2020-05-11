import React from 'react';

import classnames from 'classnames';

import FixtureWeekItem from './FixtureWeekItem';

const FixtureWeek = ({ matches }) => {
  const { week } = matches[0];

  return (
    <section className="bg-white border-t border-b sm:border border-gray-200 sm:rounded">
      <header className="flex items-center justify-between rounded-t-lg border-b border-gray-200 py-3 px-4">
        <h3 className="leading-none font-semibold">{week}. Hafta</h3>
      </header>

      <ul className="grid grid-cols-2">
        {matches.map((match, index) => 
          <li className={classnames('border-gray-200', {
            'border-r': [0, 2, 4, 6, 8].includes(index),
            'border-b': [0, 1, 2, 3, 4, 5, 6, 7].includes(index),
          })} key={match.id}>
            <FixtureWeekItem match={match} />
          </li>
        )}
      </ul>
    </section>
  );
};

export default FixtureWeek;
