import React, { useState, useLayoutEffect } from 'react';

import useFixture from '../../hooks/useFixture';

import FixtureList from './FixtureList';

const PageFixture = () => {
  const [fixtureWeeks, setFixtureWeeks] = useState([]);

  const fixture = useFixture();

  // set document title
  useLayoutEffect(() => {
    document.title = 'Fikstür';
  }, []);
  
  // set weeks
  useLayoutEffect(() => {
    if (fixture.weeks.length) {
      setFixtureWeeks(fixture.weeks);
    }
  }, [fixture.weeks]);

  return (
    <div className="relative sm:max-w-lg mx-auto">
      <FixtureList
        weeks={fixtureWeeks}
      />
    </div>
  );
};

export default PageFixture;
