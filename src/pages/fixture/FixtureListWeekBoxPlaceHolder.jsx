import React from 'react';
import PropTypes from 'prop-types';

const FixtureListWeekBoxPlaceholder = ({ week, height }) => {
  return (
    <div
      className="w-full flex items-center justify-center font-hairline text-6xl text-gray-400 bg-white border-t border-b sm:border border-gray-200 sm:rounded"
      style={{
        height: `${height}`
      }}
    >{week}</div>
  );
};

FixtureListWeekBoxPlaceholder.defaultProps = {
  week: null,
  height: null,
};

FixtureListWeekBoxPlaceholder.propTypes = {
  week: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default FixtureListWeekBoxPlaceholder;
