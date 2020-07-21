import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const useMatches = (season) => {
  const [matches, setMatches] = useState(() => {
    if (!season) {
      return [];
    }

    try {
      const matches = window.localStorage.getItem(`fikstur:saved-matches-${season}`);

      return matches ? JSON.parse(matches) : [];
    } catch (error) {
      console.log(error);

      return [];
    }
  });

  const [lastUpdatedAt, setLastUpdatedAt] = useState(() => {
    if (!season) {
      return 0;
    }

    try {
      const lastUpdatedAt = window.localStorage.getItem(`fikstur:saved-matches-${season}-last-updated-at`);

      return lastUpdatedAt ? Number(lastUpdatedAt) : 0;
    } catch (error) {
      console.log(error);

      return 0;
    }
  });

  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (window.navigator.onLine && season && !isChecking) {
      setIsChecking(true);

      fetch(`${process.env.PUBLIC_URL}/data/matches/${season}.json`)
        .then((response) => response.json())
        .then((response) => {
          const updatedAt = Number(dayjs(response.updatedAt).format('X'));

          if (matches.length === 0 || updatedAt > lastUpdatedAt) {
            setMatches(response.rows);
            setLastUpdatedAt(updatedAt);

            window.localStorage.setItem(`fikstur:saved-matches-${season}`, JSON.stringify(response.rows));
            window.localStorage.setItem(`fikstur:saved-matches-${season}-last-updated-at`, updatedAt);
          }
        })
        .catch((error) => console.error(error.message ?? 'Beklenmeyen bir hata oluştu'));
    }
  }, [season, matches, lastUpdatedAt, isChecking]);

  return matches.map((match) => ({
    id: match[0],
    season: match[1],
    week: match[2],
    home: match[3],
    away: match[4],
    score: match[5] !== null && match[6] !== null ? {
      home: match[5],
      away: match[6],
    } : null,
    date: match[7] ? dayjs(match[7]) : null,
  }))
};

export default useMatches;
