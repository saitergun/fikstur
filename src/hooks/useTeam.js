import { useContext, useEffect, useState } from 'react';

import { StoreContext } from '../store';

const useTeam = (id = 0) => {
  const [team, setTeam] = useState(null);

  const { state } = useContext(StoreContext);

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
  }, [id, state]);

  return team;
};

export default useTeam;
