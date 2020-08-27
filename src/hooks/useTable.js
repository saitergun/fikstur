import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useTable = (season) => {
  const [table, setTable] = useState([]);

  const { matches, teams } = useSelector((state) => state.data);

  useEffect(() => {
    function getTeamPlayedMatches(teamId) {
      let played = matches;

      // filter by season
      played = played.filter((match) => match.season === season);

      // filter by score
      played = played.filter((match) => match.score);

      // filter by played matches
      played = played.filter((match) => match.home === teamId || match.away === teamId);

      // map for smaller
      played = played.map((match) => {
        const isHome = match.home === teamId;
        const isAway = match.away === teamId;

        const isHomeWin = match.score.home > match.score.away;
        const isAwayWin = match.score.away > match.score.home;
        const isDrawn = match.score.home === match.score.away;

        return {
          home: match.home,
          away: match.away,
          score: match.score,
          isHome,
          isAway,
          isWin: (isHome && isHomeWin) || (isAway && isAwayWin),
          isLost: (isHome && isAwayWin) || (isAway && isHomeWin),
          isDrawn
        };
      });

      return played;
    }

    function getTeamCountsHeadToHead(firstTeamId, againstTeamId) {
      let countFirstTeamPoints = 0;
      let countAgainstTeamPoints = 0;
      let countFirstTeamGoals = 0;
      let countAgainstTeamGoals = 0;

      const homeMatch = matches.find((match) => match.home === firstTeamId && match.away === againstTeamId);
      const awayMatch = matches.find((match) => match.home === againstTeamId && match.away === firstTeamId);

      if (homeMatch?.score && awayMatch?.score) {
        countFirstTeamPoints += homeMatch.score.home === homeMatch.score.away ? 1 : homeMatch.score.home > homeMatch.score.away ? 3 : 0;
        countAgainstTeamPoints += homeMatch.score.away === homeMatch.score.home ? 1 : homeMatch.score.away > homeMatch.score.home ? 3 : 0;

        countFirstTeamPoints += awayMatch.score.home === awayMatch.score.away ? 1 : awayMatch.score.away > awayMatch.score.home ? 3 : 0;
        countAgainstTeamPoints += awayMatch.score.away === awayMatch.score.home ? 1 : awayMatch.score.home > awayMatch.score.away ? 3 : 0;

        countFirstTeamGoals = homeMatch.score.home + awayMatch.score.away;
        countAgainstTeamGoals = awayMatch.score.home + homeMatch.score.away;
      }

      return {
        countFirstTeamPoints,
        countAgainstTeamPoints,
        countFirstTeamGoals,
        countAgainstTeamGoals,
      };
    }

    let table = teams.map((team) => {
      // filter and map played matches by team
      const played = getTeamPlayedMatches(team.id);

      // filter matches by played
      const won = played.filter((match) => match.isWin);
      const lost = played.filter((match) => match.isLost);
      const drawn = played.filter((match) => match.isDrawn);

      // goal counts
      const countGoalsFor = played.reduce((previousValue, match) => match.isHome ? previousValue + match.score.home : previousValue + match.score.away, 0);
      const countGoalsAgainst = played.reduce((previousValue, match) => match.isHome ? previousValue + match.score.away : previousValue + match.score.home, 0);
      const countGoalsDifference = countGoalsFor - countGoalsAgainst;

      // points
      const countPoints = won.length * 3 + drawn.length;

      return {
        id: team.id,
        nameShort: team.nameShort,
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
        const counts = getTeamCountsHeadToHead(a.id, b.id);

        // if played two matches
        if (counts) {
          const { countFirstTeamPoints, countAgainstTeamPoints, countFirstTeamGoals, countAgainstTeamGoals } = counts;

          if (countFirstTeamPoints === countAgainstTeamPoints) {
            return countAgainstTeamGoals - countFirstTeamGoals;
          }

          return countAgainstTeamPoints - countFirstTeamPoints;
        }

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
  }, [matches, teams, season]);

  return table;
}

export default useTable;
