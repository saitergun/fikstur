import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

const useFetchTeams = () => {
  const [teams, setTeams] = useState(() => {
    try {
      const teams = window.localStorage.getItem(`fikstur:saved-teams`);

      return teams ? JSON.parse(teams) : [];
    } catch (error) {
      console.log(error);

      return [];
    }
  });

  const [lastUpdatedAt, setLastUpdatedAt] = useState(() => {
    try {
      const lastUpdatedAt = window.localStorage.getItem(`fikstur:saved-teams-last-updated-at`);

      return lastUpdatedAt ? Number(lastUpdatedAt) : 0;
    } catch (error) {
      console.log(error);

      return 0;
    }
  });

  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (window.navigator.onLine && !isChecking) {
      setIsChecking(true);

      fetch(`${process.env.PUBLIC_URL}/data/teams.json`)
        .then((response) => response.json())
        .then((response) => {
          const updatedAt = Number(dayjs(response.updatedAt).format('X'));

          if (teams.length === 0 || updatedAt > lastUpdatedAt) {
            setTeams(response.rows);
            setLastUpdatedAt(updatedAt);

            window.localStorage.setItem(`fikstur:saved-teams`, JSON.stringify(response.rows));
            window.localStorage.setItem(`fikstur:saved-teams-last-updated-at`, updatedAt);
          }
        })
        .catch((error) => console.error(error.message ?? 'Beklenmeyen bir hata oluştu'));
    }
  }, [teams, lastUpdatedAt, isChecking]);

  return teams.map(([id, name, nameShort, nameTff]) => ({
    id,
    name,
    nameShort,
    nameTff,
    link: `/team/${id}`,
    logo: require(`../media/teams/logos/120x120/${id}.png`)
  }))
};

export default useFetchTeams;
