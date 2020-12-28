import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const useFetchMatches = (season = 20202021) => {
  const [matches, setMatches] = useState([]);

  const state = useSelector(state => state);

  useEffect(() => {
    if (window.navigator.onLine) {
      fetch(`${state.app.dirPublic}data/matches/${season}.json`)
        .then((response) => response.json())
        .then((response) => {
          window.localStorage.setItem(`fikstur:saved-matches-${season}?version=${Date.now()}`, JSON.stringify(response.rows));

          setMatches(response.rows);
        })
        .catch((error) => console.error(error));
    } else {
      try {
        const savedMatches = window.localStorage.getItem(`fikstur:saved-matches-${season}`);
  
        setMatches(savedMatches ? JSON.parse(savedMatches) : []);
      } catch (error) {
        setMatches([]);
      }
    }
  }, [season, state.app.dirPublic]);

  return matches.map(([id, season, week, home, away, homeScore, awayScore, datetime, others]) => {
    const mapped = {
      id,
      season,
      week,
      home,
      away,
      score: homeScore !== null && awayScore !== null ? {
        home: homeScore,
        away: awayScore,
      } : null,
      date: datetime ? dayjs(datetime) : null,
    };

    if (others) {
      mapped.others = others;
    }

    return mapped;
  });
};

export default useFetchMatches;
