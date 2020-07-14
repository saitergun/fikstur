import { useContext, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';

import { StoreContext } from '../store';

dayjs.locale('tr');

const useTeamFixture = (id = 0) => {
  const [fixture, setFixture] = useState([]);

  const { state } = useContext(StoreContext);

  useEffect(() => {
    const matches = state.data.matches.filter((mf) => mf.home === id || mf.away === id)
      .map((mm) => {
        let result = null;

        const isHome = mm.home === id;
        const isAway = mm.away === id;

        if (mm.score.length > 0) {
          const isWinHome = mm.score[0] > mm.score[1];
          const isWinAway = mm.score[1] > mm.score[0];

          const isLostHome = mm.score[1] > mm.score[0];
          const isLostAway = mm.score[0] > mm.score[1];

          const isWin = (isHome && isWinHome) || (isAway && isWinAway);
          const isLost = (isHome && isLostHome) || (isAway && isLostAway);

          result = isWin ? 'W' : isLost ? 'L' : 'D';
        }

        const team = state.data.teams.find((t) => (isHome && t.id === mm.away) || (isAway && t.id === mm.home));

        return {
          id: mm.id,
          week: mm.week,
          isHome,
          isAway,
          team: {
            id: team.id,
            nameTff: team.name_tff,
            name: team.name,
            nameShort: team.name_short,
            link: `/team/${team.id}`,
            logo: require(`../media/teams/logos/120x120/${team.id}.png`)
          },
          score: mm.score.length === 2 ? {
            home: mm.score[0],
            away: mm.score[1],
          } : null,
          date: mm.date ? dayjs(mm.date) : null,
          result,
        };
      }
    );

    setFixture(matches);
  }, [id, state]);

  return fixture;
};

export default useTeamFixture;
