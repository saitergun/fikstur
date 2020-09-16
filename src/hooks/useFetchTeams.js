import { useState, useEffect } from 'react';

const useFetchTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (window.navigator.onLine) {
      fetch('/data/teams.json')
        .then((response) => response.json())
        .then((response) => {
          window.localStorage.setItem('fikstur:saved-teams', JSON.stringify(response.rows));

          setTeams(response.rows);
        })
        .catch((error) => console.error(error));
    } else {
      try {
        const savedMatches = window.localStorage.getItem('fikstur:saved-teams');
  
        setTeams(savedMatches ? JSON.parse(savedMatches) : []);
      } catch (error) {
        setTeams([]);
      }
    }
  }, []);

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
