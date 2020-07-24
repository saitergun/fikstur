import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import groupBy from 'lodash.groupby';

dayjs.extend(advancedFormat);

const useFixture = ({ season = 20192020, week = 100 }) => {
  const [weeks, setWeeks] = useState([]);
  const [nextWeekIndex, setNextWeekIndex] = useState(0);

  const { matches } = useSelector((state) => state.data);

  useEffect(() => {
    let weeks = matches;

    // filter matches by season
    weeks = weeks.filter((match) => match.season === season);

    // filter matches by week number
    if (week !== 100) {
      weeks = weeks.filter((match) => match.week === week);
    }

    setNextWeekIndex(weeks.find((match) => match.score)?.week ?? 0);

    // sort matches by date
    weeks = weeks.sort((a, b) => a.date && b.date && a.date.format('X') - b.date.format('X'));

    // group matches by week number
    weeks = groupBy(weeks, 'week');

    // convert weeks from object to array
    weeks = Object.values(weeks);

    // group matches by day
    weeks = weeks.map((matches) => groupBy(matches, (match) => match.date && match.date.format('dddd')));

    // convert days from object to array
    weeks = weeks.map((days) => Object.values(days));

    // set weeks
    setWeeks(weeks);
  }, [matches, season, week]);

  return {
    weeks,
    nextWeekIndex,
  };
};

export default useFixture;
