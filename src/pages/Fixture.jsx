import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { List, WindowScroller, AutoSizer} from 'react-virtualized';
import { useSelector } from 'react-redux';

import useFixture from '../hooks/useFixture';

import AppLoader from '../components/AppLoader';
import FixtureWeek from '../components/FixtureWeek';
import FixtureWeekPlaceholder from '../components/FixtureWeekPlaceholder';

const PageFixture = () => {
  const [weeks, setWeeks] = useState([]);

  const state = useSelector(state => state);

  const refList = useRef();
  const fixture = useFixture(state.data.season);

  useLayoutEffect(() => {
    let scrollTop = Number(sessionStorage.getItem('fixture-saved:fixture-scollTop') ?? 0);

    if (fixture.weeks.length) {
      setTimeout(() => {
        setWeeks(fixture.weeks);

        if (scrollTop === 0) {
          scrollTop = (fixture.nextWeekIndex - 1) * refList.current.props.rowHeight - (refList.current.props.rowHeight / 2);
        }

        // 60px ???
        scrollTop += 60;
  
        window.scrollTo(0, scrollTop);
      }, 50);
    }
  }, [fixture.weeks, fixture.nextWeekIndex]);

  useEffect(() => {
    document.title = 'Fikstür';
  }, []);

  if (!fixture.weeks.length) {
    return (
      <AppLoader />
    );
  }

  return (
    <div className="sm:max-w-lg mt-4 mx-auto">
      <WindowScroller scrollElement={window} onScroll={({ scrollTop }) => {
        sessionStorage.setItem('fixture-saved:fixture-scollTop', scrollTop);
      }}>
        {({height, isScrolling, registerChild, onChildScroll, scrollTop}) =>
          <AutoSizer disableHeight>
            {({width}) =>
              <List
                ref={refList}
                autoHeight
                width={width}
                height={height}

                rowCount={weeks.length}
                rowHeight={463 + 32}
                rowRenderer={({index, isScrolling, isVisible, key, style}) => {
                  if (!isVisible) {
                    return (
                      <span key={key} style={style}>
                        <FixtureWeekPlaceholder
                          week={weeks[index][0][0].week}
                          height={`${463}px`}
                        />

                        <span className="block w-8 h-8" />
                      </span>
                    );
                  }

                  return (
                    <span key={key} style={style}>
                      <FixtureWeek days={weeks[index]} />

                      <span className="block w-8 h-8" />
                    </span>
                  );
                }}
                noRowsRenderer={() =>
                  <AppLoader />
                }

                // onRowsRendered={({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {}}

                scrollTop={scrollTop}
                onScroll={onChildScroll}
                isScrolling={isScrolling}
              />
            }
          </AutoSizer>
        }
      </WindowScroller>
    </div>
  );
};

export default PageFixture;
