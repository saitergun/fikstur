import { useContext, useState, useEffect } from 'react';

import { StoreContext } from '../store';

const useTable = ({ season = 20192020, week = 0 }) => {
  const [table, setTable] = useState([]);

  const { state } = useContext(StoreContext);
  const { matches, teams } = state.data;

  useEffect(() => {
    function getTeamPlayedMatches(teamId) {
      let played = matches;

      // filter by season
      played = played.filter((match) => match.season === season);

      // filter by score
      played = played.filter((match) => match.score.length);

      // filter by played matches
      played = played.filter((match) => match.home === teamId || match.away === teamId);

      // map for smaller
      played = played.map((match) => ({
        home: match.home,
        away: match.away,
        score: match.score,
      }));

      return played;
    }

    let table = teams.map((team) => {
      // filter and map played matches by team
      const played = getTeamPlayedMatches(team.id);

      // filter matches by played
      const won = played.filter((match) => (match.home === team.id && match.score[0] > match.score[1]) || (match.away === team.id && match.score[1] > match.score[0]));
      const lost = played.filter((match) => (match.home === team.id && match.score[1] > match.score[0]) || (match.away === team.id && match.score[0] > match.score[1]));
      const drawn = played.filter((match) => match.score[0] === match.score[1]);

      // goal counts
      const countGoalsFor = played.reduce((previousValue, match) => match.home === team.id ? previousValue + match.score[0] : previousValue + match.score[1], 0);
      const countGoalsAgainst = played.reduce((previousValue, match) => match.home === team.id ? previousValue + match.score[1] : previousValue + match.score[0], 0);
      const countGoalsDifference = countGoalsFor - countGoalsAgainst;

      // points
      const countPoints = won.length * 3 + drawn.length;

      return {
        id: team.id,
        nameShort: team.name_short,
        logo: require(`../media/teams/logos/120x120/${team.id}.png`),
        countPlayed: played.length,
        countWon: won.length,
        countDrawn: drawn.length,
        countLost: lost.length,
        countGoalsFor,
        countGoalsAgainst,
        countGoalsDifference,
        countPoints,
      }
    });

    table = table.sort((a, b) => {
      // if equal points
      if (b.countPoints === a.countPoints) {
        // if equal goals difference
        if (b.countGoalsDifference === a.countGoalsDifference) {
          return b.countGoalsFor - a.countGoalsFor;
        }

        return b.countGoalsDifference - a.countGoalsDifference;
      }

      return b.countPoints - a.countPoints;
    });

    table = table.map((team, index) => ({
      position: index + 1,
      ...team,
    }))

    setTable(table);

    return () => {
      setTable([]);
    };
  }, [matches, teams, season, week]);

  return table;
}

export default useTable;
