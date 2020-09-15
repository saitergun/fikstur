import React from 'react';
import PropTypes from 'prop-types';
import { StickyTable, Row, Cell } from 'react-sticky-table';

import TableRow from './TableRow';

const Table = ({ rows }) => {
  if (!rows) {
    return null;
  }

  return (
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

        {rows.map((row) =>
          <TableRow
            key={row.position}
            row={row}
          />
        )}
      </StickyTable>
    </div>
  );
};

Table.defaultProps = {
  rows: null,
}

Table.propTypes = {
  rows: PropTypes.array,
}

export default Table;
