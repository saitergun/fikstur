import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

          {table.map((row) =>
            <Row
              onClick={() => {history.push(row.team.link)}}
              key={row.position}
            >
              <Cell className="shadow-lg">
                <div className="flex items-center space-x-3 pr-2">
                  <span className="w-5 block text-right font-semibold">{row.position}</span>

                  <span className="w-6 flex items-center justify-center">
                    <Link
                      to={row.team.link}
                      title={row.team.name}
                    >
                      <TeamLogo
                        src={row.team.logo}
                        alt={row.team.name}
                      />
                    </Link>
                  </span>

                  <span className="block leading-none">{row.team.nameShort}</span>
                </div>
              </Cell>
              <Cell className="text-right font-semibold">{row.counts.points ? row.counts.points : '-'}</Cell>
              <Cell className="text-right">{row.counts.played ? row.counts.played : '-'}</Cell>
              <Cell className="text-right">{row.counts.won ? row.counts.won : '-'}</Cell>
              <Cell className="text-right">{row.counts.drawn ? row.counts.drawn : '-'}</Cell>
              <Cell className="text-right">{row.counts.lost ? row.counts.lost : '-'}</Cell>
              <Cell className="text-right">{row.counts.goalsFor ? row.counts.goalsFor : '-'}</Cell>
              <Cell className="text-right">{row.counts.goalsAgainst ? row.counts.goalsAgainst : '-'}</Cell>
              <Cell className="text-right">{row.counts.goalsDifference > 0 ? `+${row.counts.goalsDifference}` : row.counts.goalsDifference ? row.counts.goalsDifference : '-'}</Cell>
            </Row>
          )}
        </StickyTable>
      </div>
    </div>
  );
};

export default PageTable;
