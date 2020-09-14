import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';

import groupBy from 'lodash.groupby';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import AppLoader from '../../components/AppLoader';
import EditorMatchWeekTable from './EditorMatchWeekTable';

dayjs.extend(advancedFormat);

const DEFAULT_TABLE_HEIGHT = 353;
const TABLE_GAP = 32;

const PageEditor = () => {
  const [matches, setMatches] = useState(null);
  const [weeks, setWeeks] = useState([]);

  const stateMatches = useSelector((state) => state.data.matches);
  const textareaRef = useRef();

  useEffect(() => {
    document.title = 'Editör';
  }, []);

  // set matches, weeks
  useEffect(() => {
    if (matches === null && stateMatches.length > 0) {
      const rows = stateMatches.map((match) => ([
        match.id,
        match.season,
        match.week,
        match.home,
        match.away,
        match.score ? match.score.home : null,
        match.score ? match.score.away : null,
        match.date ? match.date.format('YYYY-MM-DD HH:mm') : null
      ]));

      // set matches
      setMatches({
        columns: ['id', 'season', 'week', 'home', 'away', 'homeScore', 'awayScore', 'datetime'],
        rows,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
      });

      // set weeks
      setWeeks(Object.values(groupBy(rows, 2)));
    }
  }, [stateMatches, matches]);

  const handleUpdateMatch = (match) => {
    const matchesCopy = {...matches};

    matchesCopy.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const thisMatch = matchesCopy.rows.find((row) => row[0] === match.id);

    if (thisMatch) {
      thisMatch[0] = match.id;
      thisMatch[3] = match.home;
      thisMatch[4] = match.away;
      thisMatch[5] = match.homeScore;
      thisMatch[6] = match.awayScore;
      thisMatch[7] = match.date;

      setMatches(matchesCopy);

      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    } else {
      throw new Error('match not found');
    }
  };

  const rowRenderer = ({index, isScrolling, isVisible, key, style}) => {
    if (!isVisible) {
      return (
        <span key={key} style={style}>
          <span
            className="w-full flex items-center justify-center font-hairline text-6xl text-gray-400 bg-white border-t border-b sm:border border-gray-200 sm:rounded"
            style={{
              height: `${DEFAULT_TABLE_HEIGHT}px`,
            }}
          >{JSON.stringify(weeks[index][0][2])}</span>
        </span>
      );
    }

    return (
      <span key={key} style={style}>
        <EditorMatchWeekTable
          matches={weeks[index]}
          setMatch={(match) => handleUpdateMatch(match)}
        />
      </span>
    );
  };

  if (weeks.length === 0) {
    return <AppLoader />;
  }

  return (
    <main className="max-w-5xl mx-auto mt-4 font-sans">
      <div className="pb-4">
        <textarea
          className="w-full h-20 border-2 p-1 font-mono text-xs"
          value={JSON.stringify(matches)}
          onChange={(e) => console.log(e.target)}
          ref={textareaRef}
        />
      </div>

      <WindowScroller>
        {({height, width, isScrolling, scrollTop, registerChild, onChildScroll}) => {
          return (
            <AutoSizer>
              {({width}) => {
                return (
                  <List
                    width={width}
                    height={height}
                    autoHeight

                    rowCount={weeks.length}
                    rowHeight={DEFAULT_TABLE_HEIGHT + TABLE_GAP}
                    rowRenderer={rowRenderer}
                    noRowsRenderer={() => <AppLoader />}
                    estimatedRowSize={(DEFAULT_TABLE_HEIGHT + TABLE_GAP) + weeks.length}

                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    isScrolling={isScrolling}
                  />
                );
              }}
            </AutoSizer>
          );
        }}
      </WindowScroller>
    </main>
  );
};

export default PageEditor;
