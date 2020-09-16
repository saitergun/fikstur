import React, { useState, useEffect } from 'react';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';

import useFixture from '../hooks/useFixture';

import AppLoader from '../components/AppLoader';
import FixtureWeek from '../components/FixtureWeek';
import FixtureWeekPlaceholder from '../components/FixtureWeekPlaceholder';

const DEFAULT_WEEK_HEIGHT = 447; // withouts day height 447
const WEEK_GAP = 32; // 2rem
const DAY_TEXT_HEIGHT = 16; // one day text height 1rem

const PageFixture = () => {
  const [weeks, setWeeks] = useState([]);
  const [firstScrollOk, setFirstScrollOk] = useState(false);

  const fixture = useFixture();

  // init
  useEffect(() => {
    document.title = 'Fikstür';

    return () => {
      setFirstScrollOk(false);
    };
  }, []);

  // set weeks
  useEffect(() => {
    let scrollTop = Number(sessionStorage.getItem('fixture-saved:fixture-scollTop') ?? 0);

    if (fixture.weeks.length) {
      setTimeout(() => {
        setWeeks(fixture.weeks);

        if (scrollTop > 100) {
          window.scrollTo(0, scrollTop);
        }

        setFirstScrollOk(true);
      }, 5);
    }
  }, [fixture.weeks, fixture.nextWeekIndex]);

  // List prop
  const rowRenderer = ({index, isScrolling, isVisible, key, style}) => {
    if (!isVisible) {
      return (
        <span key={key} style={style}>
          <FixtureWeekPlaceholder
            week={weeks[index][0][0].week}
            height={`${DEFAULT_WEEK_HEIGHT}px`}
          />
        </span>
      );
    }

    return (
      <span key={key} style={style}>
        <FixtureWeek days={weeks[index]} />
      </span>
    );
  };

  // List prop
  const rowHeight = ({ index }) => {
    let height = DEFAULT_WEEK_HEIGHT;

    if (weeks[index][0][0].date !== null) {
      height = DEFAULT_WEEK_HEIGHT + (weeks[index].length * DAY_TEXT_HEIGHT);
    }

    if (index + 1 !== weeks.length) {
      height += WEEK_GAP;
    }

    return height;
  };

  // List prop
  const estimatedRowSize = DEFAULT_WEEK_HEIGHT + (DAY_TEXT_HEIGHT * 4) + WEEK_GAP;

  if (!fixture.weeks.length) {
    return (
      <AppLoader />
    );
  }

  return (
    <div className="relative sm:max-w-lg mx-auto">
      <WindowScroller>
        {({height, width, isScrolling, scrollTop, registerChild, onChildScroll}) => {
          if (firstScrollOk) {
            sessionStorage.setItem('fixture-saved:fixture-scollTop', scrollTop + 60);
          }

          return (
            <AutoSizer>
              {({width}) => {
                return (
                  <List
                    className="my-4"

                    width={width}
                    height={height}
                    autoHeight

                    rowCount={weeks.length}
                    rowHeight={rowHeight}
                    rowRenderer={rowRenderer}
                    noRowsRenderer={() => <AppLoader />}
                    estimatedRowSize={estimatedRowSize}

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
    </div>
  );
};

export default PageFixture;
