import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';

dayjs.locale('tr');

const useMatch = (id = 0) => {
  const [match, setMatch] = useState(null);

  const state = useSelector((state) => state);

  useEffect(() => {
    const find = state.data.matches.find((m) => m.id === id);

    if (find) {
      const home = state.data.teams.find((t) => t.id === find.home);
      const away = state.data.teams.find((t) => t.id === find.away);

      setMatch({
        id,
        week: find.week,
        home: {
          id: home.id,
          nameTff: home.nameTff,
          name: home.name,
          nameShort: home.nameShort,
          link: `/team/${home.id}`,
          logo: require(`../media/teams/logos/120x120/${home.id}.png`)
        },
        away: {
          id: away.id,
          nameTff: away.nameTff,
          name: away.name,
          nameShort: away.nameShort,
          link: `/team/${away.id}`,
          logo: require(`../media/teams/logos/120x120/${away.id}.png`)
        },
        score: find.score,
        date: find.date
      });
    } else {
      setMatch(null);
    }
  }, [id, state]);

  return match;
};

export default useMatch;
