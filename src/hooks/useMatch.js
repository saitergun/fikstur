import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useMatch = (id = 0) => {
  const [match, setMatch] = useState(null);

  const { matches, teams } = useSelector((state) => state.data);

  useEffect(() => {
    const find = matches.find((m) => m.id === id);

    if (find) {
      const home = teams.find((team) => team.id === find.home);
      const away = teams.find((team) => team.id === find.away);

      setMatch({
        id,
        season: find.season,
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
        date: find.date,
        others: find.others,
      });
    } else {
      setMatch(null);
    }
  }, [id, matches, teams]);

  return match;
};

export default useMatch;
