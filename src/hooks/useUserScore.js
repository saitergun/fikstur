import { useContext, useEffect, useState } from 'react';

import { StoreContext } from '../store';

const useUserScore = (match = 0) => {
  const [response, setResponse] = useState(null);

  const { state } = useContext(StoreContext);

  useEffect(() => {
    if (match) {
      const userMatch = state.data.userScores.find((m) => m.match === match);

      if (userMatch) {
        setResponse(userMatch.score);
      } else {
        setResponse(null);
      }
    } else {
      setResponse(state.data.userScores);
    }
  }, [match, state]);

  return response;
};

export default useUserScore;
