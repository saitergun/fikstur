import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FixtureListWeekItem from './FixtureListWeekItem';

const FixtureListWeekBox = ({ days }) => {
  const [lastMatchId, setLastMatchId] = useState(null);

  useEffect(() => {
    const lastDayMatches = days[days.length - 1];
    const lastDayLastMatch = lastDayMatches[lastDayMatches.length - 1];

    setLastMatchId(lastDayLastMatch.id);
  }, [days]);

  return (
    <section className="bg-white border-t border-b sm:border border-gray-200 sm:rounded">
      <header className="border-b border-gray-200 text-lg py-1 px-4">
        {`${days[0][0].week}. hafta`}
      </header>

      {days.map((matches) => matches.map((match, index) =>
        <FixtureListWeekItem
          key={match.id}
          match={match}
          isLastMatch={match.id === lastMatchId}
          showMatchDate={index === 0 && match.date && true}
        />
      ))}
    </section>
  );
};

FixtureListWeekBox.defaultProps = {
  days: [],
};

FixtureListWeekBox.propTypes = {
  days: PropTypes.array,
};

export default FixtureListWeekBox;
