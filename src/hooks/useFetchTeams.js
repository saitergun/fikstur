import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useFetchTeams = () => {
  const [teams, setTeams] = useState([]);

  const state = useSelector(state => state);

  useEffect(() => {
    if (window.navigator.onLine) {
      fetch(`${state.app.dirPublic}data/teams.json`)
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
  }, [state.app.dirPublic]);

  return teams.map(([id, name, nameShort, nameTff]) => ({
    id,
    name,
    nameShort,
    nameTff,
    link: `/team/${id}`,
    logo: require(`../media/teams/logos/120x120/${id}.png`),
  }));
};

export default useFetchTeams;
