import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row, Cell } from 'react-sticky-table';

import TableCellTeam from './TableCellTeam';

const TableRow = ({ row }) => {
  const history = useHistory();

  const { position, counts, team } = row;
  const { points, played, won, drawn, lost, goalsFor, goalsAgainst, goalsDifference } = counts;

  if (!row) {
    return null;
  }

  return (
    <Row
      key={position}
      onClick={() => history.push(team.link)}
    >
      <Cell className="shadow-lg">
        <TableCellTeam position={position} team={team} />
      </Cell>
      <Cell className="text-right font-semibold">{points ? points : '-'}</Cell>
      <Cell className="text-right">{played ? played : '-'}</Cell>
      <Cell className="text-right">{won ? won : '-'}</Cell>
      <Cell className="text-right">{drawn ? drawn : '-'}</Cell>
      <Cell className="text-right">{lost ? lost : '-'}</Cell>
      <Cell className="text-right">{goalsFor ? goalsFor : '-'}</Cell>
      <Cell className="text-right">{goalsAgainst ? goalsAgainst : '-'}</Cell>
      <Cell className="text-right">{goalsDifference > 0 ? `+${goalsDifference}` : goalsDifference ? goalsDifference : '-'}</Cell>
    </Row>
  );
};

TableRow.defaultProps = {
  row: null,
}

TableRow.propTypes = {
  row: PropTypes.object,
}

export default TableRow;
