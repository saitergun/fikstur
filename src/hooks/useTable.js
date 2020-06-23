import { useContext, useState, useEffect } from 'react';

import { StoreContext } from '../store';

const useTable = ({ season = 20192020, week = 0 }) => {
  const [table, setTable] = useState([]);

  const { state } = useContext(StoreContext);
  const { matches, teams, userScores } = state.data;

  useEffect(() => {
    function getTeamPlayedMatches(teamId) {
      let played = matches;

      // add user scores
      played = played.map((match) => {
        const userScore = userScores.find((m) => m.match === match.id);

        if (match.score.length === 0 && userScore) {
          match.score = userScore.score;
          match.userScore = userScore.score;
        }

        return match;
      })

      // filter by season
      played = played.filter((match) => match.season === season);

      // filter by score
      played = played.filter((match) => match.score.length);

      // filter by played matches
      played = played.filter((match) => match.home === teamId || match.away === teamId);

      // map for smaller
      played = played.map((match) => ({
        week: match.week,
        home: match.home,
        away: match.away,
        score: match.score,
        userScore: match.userScore
      }));

      return played;
    }

    function getTeamNextMatches(teamId) {
      return matches
        // filter by season
        .filter((match) => match.season === season)

        // filter by week
        .filter((match) => match.week > week)

        // filter by score
        .filter((match) => match.score.length === 0)

        // filter by played matches
        .filter((match) => match.home === teamId || match.away === teamId)

        .reverse()

        .slice(-3)

        // map for smaller
        .map((match) => ({
          home: match.home,
          away: match.away,
          score: match.score,
          ...match,
          home_team_name_short: teams.find((t) => t.id === match.home).name_short,
          away_team_name_short: teams.find((t) => t.id === match.away).name_short,
        }))
    }

    let table = teams.map((team) => {
      // filter and map played matches by team
      const played = getTeamPlayedMatches(team.id);

      // filter matches by played
      const won = played.filter((match) => (match.home === team.id && match.score[0] > match.score[1]) || (match.away === team.id && match.score[1] > match.score[0]));
      const lost = played.filter((match) => (match.home === team.id && match.score[1] > match.score[0]) || (match.away === team.id && match.score[0] > match.score[1]));
      const drawn = played.filter((match) => match.score[0] === match.score[1]);

      const lastResults = played.filter((match) => match.home === team.id || match.away === team.id)
        .slice(-5)
        .reverse()
        .map((match2) => {
          let result = 'D';

          if ((match2.home === team.id && match2.score[0] > match2.score[1]) || (match2.away === team.id && match2.score[1] > match2.score[0])) {
            result = 'W';
          }

          if ((match2.home === team.id && match2.score[1] > match2.score[0]) || (match2.away === team.id && match2.score[0] > match2.score[1])) {
            result = 'L';
          }

          return {
            ...match2,
            home_team_name_short: teams.find((t) => t.id === match2.home).name_short,
            away_team_name_short: teams.find((t) => t.id === match2.away).name_short,
            result,
          };
        });

      const nextMatches = getTeamNextMatches(team.id);;

      // goal counts
      const countGoalsFor = played.reduce((previousValue, match) => match.home === team.id ? previousValue + match.score[0] : previousValue + match.score[1], 0);
      const countGoalsAgainst = played.reduce((previousValue, match) => match.home === team.id ? previousValue + match.score[1] : previousValue + match.score[0], 0);
      const countGoalsDifference = countGoalsFor - countGoalsAgainst;

      // points
      const countPoints = won.length * 3 + drawn.length;

      return {
        id: team.id,
        nameShort: team.name_short,
        countPlayed: played.length,
        countWon: won.length,
        countDrawn: drawn.length,
        countLost: lost.length,
        countGoalsFor,
        countGoalsAgainst,
        countGoalsDifference,
        countPoints,
        played,
        lastResults,
        nextMatches,
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
  }, [matches, teams, season, week, userScores]);

  return table;
}

export default useTable;
