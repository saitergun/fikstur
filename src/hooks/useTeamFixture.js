import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';

dayjs.locale('tr');

const useTeamFixture = (id = 0) => {
  const [fixture, setFixture] = useState([]);

  const state = useSelector((state) => state);

  useEffect(() => {
    const matches = state.data.matches
      .filter((mf) => mf.home === id || mf.away === id)
      .map((mm) => {
        let result = null;

        const isHome = mm.home === id;
        const isAway = mm.away === id;

        if (mm.score) {
          const isWinHome = mm.score.home > mm.score.away;
          const isWinAway = mm.score.away > mm.score.home;

          const isLostHome = mm.score.away > mm.score.home;
          const isLostAway = mm.score.home > mm.score.away;

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
            nameTff: team.nameTff,
            name: team.name,
            nameShort: team.nameShort,
            link: `/team/${team.id}`,
            logo: require(`../media/teams/logos/120x120/${team.id}.png`)
          },
          score: mm.score,
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
