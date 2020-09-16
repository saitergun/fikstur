import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import groupBy from 'lodash.groupby';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/tr';

dayjs.locale('tr');
dayjs.extend(advancedFormat);
dayjs.extend(isYesterday);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const useFixture = (week) => {
  const [weeks, setWeeks] = useState([]);
  const [nextWeekIndex, setNextWeekIndex] = useState(0);

  const { matches, teams } = useSelector((state) => state.data);

  useEffect(() => {
    const getTeamById = (id) => {
      const find = teams.find((team) => team.id === id);
  
      if (find) {
        return {
          id,
          name: find.name,
          nameShort: find.nameShort,
          nameTff: find.nameTff,
          link: `/team/${find.id}`,
          logo: require(`../media/teams/logos/120x120/${id}.png`)
        };
      }
  
      return null;
    };

    let weeks = matches;

    // filter matches by week number
    if (week !== undefined) {
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

    weeks = weeks.map((week) => {
      return week.map((days) => {
        return days.map((match) => {
          const home = getTeamById(match.home);
          const away = getTeamById(match.away);

          let date = null;

          if (match.date) {
            date = {
              isYesterday: match.date.isYesterday(),
              isToday: match.date.isToday(),
              isTomorrow: match.date.isTomorrow(),

              dddd: match.date.format('dddd'),
              D: match.date.format('D'),
              MMM: match.date.format('MMM'),

              HH: match.date.format('HH'),
              mm: match.date.format('mm'),
            }
          }

          return {
            ...match,
            home,
            away,
            date,
          };
        });
      });
    });

    // set weeks
    setWeeks(weeks);
  }, [matches, teams, week]);

  return {
    weeks,
    nextWeekIndex,
  };
};

export default useFixture;
