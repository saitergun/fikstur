import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTeam = (id = 0) => {
  const [team, setTeam] = useState(null);

  const { teams } = useSelector((state) => state.data);

  useEffect(() => {
    const find = teams.find((team) => team.id === id);

    setTeam(find ?? null);
  }, [id, teams]);

  return team;
};

export default useTeam;
