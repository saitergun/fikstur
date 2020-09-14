import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StickyTable, Row, Cell } from 'react-sticky-table';

import useTable from '../hooks/useTable';

import AppLoader from '../components/AppLoader';
import TeamLogo from '../components/TeamLogo';

const PageTable = () => {
  const state = useSelector(state => state);
  const history = useHistory();

  const table = useTable(state.data.season);

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Puan Durumu';
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
                    <TeamLogo
                      src={team.logo}
                      title={team.name}
                    />
                  </span>

                  <span className="block leading-none">{team.nameShort}</span>
                </div>
              </Cell>
              <Cell className="text-right font-semibold">{team.countPoints ? team.countPoints : '-'}</Cell>
              <Cell className="text-right">{team.countPlayed ? team.countPlayed : '-'}</Cell>
              <Cell className="text-right">{team.countWon ? team.countWon : '-'}</Cell>
              <Cell className="text-right">{team.countDrawn ? team.countDrawn : '-'}</Cell>
              <Cell className="text-right">{team.countLost ? team.countLost : '-'}</Cell>
              <Cell className="text-right">{team.countGoalsFor ? team.countGoalsFor : '-'}</Cell>
              <Cell className="text-right">{team.countGoalsAgainst ? team.countGoalsAgainst : '-'}</Cell>
              <Cell className="text-right">{team.countGoalsDifference > 0 ? `+${team.countGoalsDifference}` : team.countGoalsDifference ? team.countGoalsDifference : '-'}</Cell>
            </Row>
          )}
        </StickyTable>
      </div>
    </div>
  );
};

export default PageTable;
