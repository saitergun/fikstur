import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/tr';

dayjs.extend(advancedFormat);
dayjs.locale('tr');

const useMatches = (season = 20202021) => {
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

  return matches.map(([id, season, week, home, away, homeScore, awayScore, datetime]) => {
    return {
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
  })
};

export default useMatches;
