import React, { useLayoutEffect, useState, useRef } from 'react';
import { List, WindowScroller, AutoSizer} from 'react-virtualized';

import useFixture from '../hooks/useFixture';

import AppLoader from '../components/AppLoader';
import FixtureWeek from '../components/FixtureWeek';

const PageFixture = () => {
  const [weeks, setWeeks] = useState([]);

  const refList = useRef();
  const fixture = useFixture({});

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
                rowRenderer={({index, isScrolling, isVisible, key, style}) =>
                  <span key={key} style={style}>
                    <FixtureWeek days={weeks[index]} />

                    <span className="block w-8 h-8" />
                  </span>
                }
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
