import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {StickyTable, Row, Cell} from 'react-sticky-table';

import useTable from '../hooks/useTable';

import AppLoader from '../components/AppLoader';

const PageTable = () => {
  const history = useHistory();

  const table = useTable({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (table.length === 0) {
    return (
      <AppLoader />
    );
  }

  return (
    <div className="relative sm:max-w-lg py-4 mx-auto">
      <div className="w-full h-auto border-t border-b sm:border border-gray-200 bg-white rounded overflow-hidden">
        <StickyTable
          className="league-table"
          stickyHeaderCount={1}
          leftStickyColumnCount={1}
          rightStickyColumnCount={0}
          stickyFooterCount={0}
          borderWidth="1px"
          borderColor="#edf2f7" // gray-200
        >
          <Row>
            <Cell></Cell>
            <Cell className="font-semibold text-right text-sm">P</Cell>
            <Cell className="font-semibold text-right text-sm">O</Cell>
            <Cell className="font-semibold text-right text-sm">G</Cell>
            <Cell className="font-semibold text-right text-sm">B</Cell>
            <Cell className="font-semibold text-right text-sm">M</Cell>
            <Cell className="font-semibold text-right text-sm">AG</Cell>
            <Cell className="font-semibold text-right text-sm">YG</Cell>
            <Cell className="font-semibold text-right text-sm">Av.</Cell>
          </Row>

          {table.map((team) =>
            <Row
              onClick={() => {history.push(`/team/${team.id}`)}}
              key={team.position}
            >
              <Cell className="shadow-lg">
                <div className="flex items-center space-x-3 pr-2">
                  <span className="w-5 block text-right font-semibold">{team.position}</span>

                  <span className="w-6 flex items-center justify-center">
                    <img
                      className="block w-5 h-5"
                      src={require(`../media/teams/logos/120x120/${team.id}.png`)}
                      alt={team.nameShort}
                    />
                  </span>

                  <span className="block leading-none">{team.nameShort}</span>
                </div>
              </Cell>
              <Cell className="text-right font-semibold">{team.countPoints}</Cell>
              <Cell className="text-right">{team.countPlayed}</Cell>
              <Cell className="text-right">{team.countWon}</Cell>
              <Cell className="text-right">{team.countDrawn}</Cell>
              <Cell className="text-right">{team.countLost}</Cell>
              <Cell className="text-right">{team.countGoalsFor}</Cell>
              <Cell className="text-right">{team.countGoalsAgainst}</Cell>
              <Cell className="text-right">{team.countGoalsDifference > 0 ? `+${team.countGoalsDifference}` : team.countGoalsDifference}</Cell>
            </Row>
          )}
        </StickyTable>
      </div>
    </div>
  );
};

export default PageTable;
