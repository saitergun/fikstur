import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TeamLogo from '../../components/TeamLogo';

const TableCellTeam = ({ position, team }) => {
  return (
    <div className="flex items-center space-x-3 pr-2">
      <span className="w-5 block text-right font-semibold">{position}</span>

      <span className="w-6 flex items-center justify-center">
        <Link to={team.link} title={team.name}>
          <TeamLogo src={team.logo} alt={team.name} />
        </Link>
      </span>

      <span className="block leading-none">{team.nameShort}</span>
    </div>
  );
};

TableCellTeam.defaultProps = {
  position: null,
  team: null,
}

TableCellTeam.propTypes = {
  position: PropTypes.number.isRequired,
  team: PropTypes.object.isRequired,
}

export default TableCellTeam;
