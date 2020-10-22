import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const useFetchMatches = (season = 20202021) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (window.navigator.onLine) {
      fetch(`https://raw.githubusercontent.com/saitergun/fikstur/master/public/data/matches/${season}.json`)
        .then((response) => response.json())
        .then((response) => {
          window.localStorage.setItem(`fikstur:saved-matches-${season}`, JSON.stringify(response.rows));

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
  }, [season]);

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
  })
};

export default useFetchMatches;
