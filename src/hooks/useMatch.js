import { useContext, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';

import { StoreContext } from '../store';

dayjs.locale('tr');

const useMatch = (id = 0) => {
  const [match, setMatch] = useState(null);

  const { state } = useContext(StoreContext);

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
