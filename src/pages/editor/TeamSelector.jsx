import React from 'react';

const TeamSelector = ({ options, selected, onChange }) => {
  const sorter = (a, b) => {
    const textA = a.text.toLocaleUpperCase('tr-TR');
    const textB = b.text.toLocaleUpperCase('tr-TR');

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

  return (
    <select
      className="block w-full bg-transparent appearance-none cursor-pointer px-2"
      value={selected ?? 0}
      onChange={onChange}
    >
      <option value={0}>-</option>
      {options.sort(sorter).map((option) => <option key={option.value} value={option.value}>{option.text}</option>)}
    </select>
  );
};

export default TeamSelector;
