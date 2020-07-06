import { useContext, useEffect, useState } from 'react';

import moment from 'moment';

import groupBy from 'lodash.groupby';

import { StoreContext } from '../store';

const date2timestamp = (date) => Number(moment(date).format('X'));

const useFixture = ({ season = 20192020, week = 100 }) => {
  const [weeks, setWeeks] = useState([]);
  const [nextWeekIndex, setNextWeekIndex] = useState(0);

  const { matches } = useContext(StoreContext).state.data;

  useEffect(() => {
    let weeks = matches;

    // filter matches by season
    weeks = weeks.filter((match) => match.season === season);

    // filter matches by week number
    if (week !== 100) {
      weeks = weeks.filter((match) => match.week === week);
    }

    setNextWeekIndex(weeks.find((match) => match.score.length === 0)?.week ?? 0);

    // sort matches by date
    weeks = weeks.sort((a, b) => date2timestamp(a.date) - date2timestamp(b.date));

    // group matches by week number
    weeks = groupBy(weeks, 'week');

    // matches convert object to array
    weeks = Object.values(weeks);

    // set weeks
    setWeeks(weeks);
  }, [matches, season, week]);

  return {
    weeks,
    nextWeekIndex,
  };
};

export default useFixture;
