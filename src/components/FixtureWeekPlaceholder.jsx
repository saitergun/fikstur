import React from 'react';

const FixtureWeekPlaceholder = ({ week, height }) => {
  return (
    <div
      className="w-full flex items-center justify-center font-hairline text-6xl text-gray-400 bg-white border-t border-b sm:border border-gray-200 sm:rounded"
      style={{
        height
      }}
    >{week}</div>
  );
};

export default FixtureWeekPlaceholder;
