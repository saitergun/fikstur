import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTeam = (id = 0) => {
  const [team, setTeam] = useState(null);

  const state = useSelector((state) => state);

  useEffect(() => {
    const find = state.data.teams.find((t) => t.id === id);

    if (find) {
      setTeam({
        id,
        nameTff: find.nameTff,
        name: find.name,
        nameShort: find.nameShort,
        logo: require(`../media/teams/logos/120x120/${id}.png`)
      });
    } else {
      setTeam(null);
    }
  }, [id, state.data.teams]);

  return team;
};

export default useTeam;
