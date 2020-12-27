import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useTable = () => {
  const [table, setTable] = useState([]);

  const { matches, teams } = useSelector((state) => state.data);

  useEffect(() => {
    function getTeamPlayedMatches(teamId) {
      let played = matches;

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
          isDrawn,
        };
      });

      return played;
    }

    // function getTeamCountsHeadToHead(firstTeamId, againstTeamId) {
    //   let countFirstTeamPoints = 0;
    //   let countAgainstTeamPoints = 0;
    //   let countFirstTeamGoals = 0;
    //   let countAgainstTeamGoals = 0;

    //   const homeMatch = matches.find((match) => match.home === firstTeamId && match.away === againstTeamId);
    //   const awayMatch = matches.find((match) => match.home === againstTeamId && match.away === firstTeamId);

    //   if (homeMatch?.score && awayMatch?.score) {
    //     countFirstTeamPoints += homeMatch.score.home === homeMatch.score.away ? 1 : homeMatch.score.home > homeMatch.score.away ? 3 : 0;
    //     countAgainstTeamPoints += homeMatch.score.away === homeMatch.score.home ? 1 : homeMatch.score.away > homeMatch.score.home ? 3 : 0;

    //     countFirstTeamPoints += awayMatch.score.home === awayMatch.score.away ? 1 : awayMatch.score.away > awayMatch.score.home ? 3 : 0;
    //     countAgainstTeamPoints += awayMatch.score.away === awayMatch.score.home ? 1 : awayMatch.score.home > awayMatch.score.away ? 3 : 0;

    //     countFirstTeamGoals = homeMatch.score.home + awayMatch.score.away;
    //     countAgainstTeamGoals = awayMatch.score.home + homeMatch.score.away;
    //   }

    //   return {
    //     countFirstTeamPoints,
    //     countAgainstTeamPoints,
    //     countFirstTeamGoals,
    //     countAgainstTeamGoals,
    //   };
    // }

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
        team: {
          id: team.id,
          name: team.name,
          nameShort: team.nameShort,
          nameTff: team.nameTff,
          link: `/team/${team.id}`,
          logo: require(`../media/teams/logos/120x120/${team.id}.png`),
        },
        counts: {
          played: played.length,
          won: won.length,
          drawn: drawn.length,
          lost: lost.length,
          goalsFor: countGoalsFor,
          goalsAgainst: countGoalsAgainst,
          goalsDifference: countGoalsDifference,
          points: countPoints,
        },
      }
    });

    table = table.sort((a, b) => {
      // if season not started for each teams
      // if (b.countPlayed === 0 && a.countPlayed === 0) {
      //   const nameTeamA = a.nameShort.toLocaleLowerCase('tr-TR');
      //   const nameTeamB = b.nameShort.toLocaleLowerCase('tr-TR');

      //   if (nameTeamA < nameTeamB) {
      //     return -1;
      //   }

      //   if (nameTeamA > nameTeamB) {
      //     return 1;
      //   }

      //   return 0;
      // }

      // if equal points
      if (b.counts.points === a.counts.points) {
        // const counts = getTeamCountsHeadToHead(a.id, b.id);

        // if played two matches
        // if (counts) {
        //   const { countFirstTeamPoints, countAgainstTeamPoints, countFirstTeamGoals, countAgainstTeamGoals } = counts;

        //   if (countFirstTeamPoints === countAgainstTeamPoints) {
        //     return countAgainstTeamGoals - countFirstTeamGoals;
        //   }

        //   return countAgainstTeamPoints - countFirstTeamPoints;
        // }

        // if equal goals difference
        if (b.counts.goalsDifference === a.counts.goalsDifference) {
          return b.counts.goalsFor - a.counts.goalsFor;
        }

        return b.counts.goalsDifference - a.counts.goalsDifference;
      }

      return b.counts.points - a.counts.points;
    });

    table = table.map((team, index) => ({
      position: index + 1,
      ...team,
    }));

    setTable(table);

    return () => {
      setTable([]);
    };
  }, [matches, teams]);

  return table;
}

export default useTable;
