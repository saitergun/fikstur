import React, { useState, useLayoutEffect, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';

import AppLoader from '../../components/AppLoader';

import FixtureListWeekBoxPlaceholder from './FixtureListWeekBoxPlaceHolder';
import FixtureListWeekBox from './FixtureListWeekBox';

const DEFAULT_WEEK_HEIGHT = 447; // withouts day height 447
const WEEK_GAP = 32; // 2rem
const DAY_TEXT_HEIGHT = 16; // one day text height 1rem

const FixtureList = ({ weeks, scrollToWeek }) => {
  const [firstScrollOk, setFirstScrollOk] = useState(false);

  // init
  useLayoutEffect(() => {
    return () => {
      setFirstScrollOk(false);
    };
  }, []);

  // set scrollTop
  useLayoutEffect(() => {
    let scrollTop = Number(sessionStorage.getItem('fixture-saved:fixture-scollTop') ?? 0);

    if (weeks.length > 0 && scrollTop > 60) {
      window.scrollTo(0, scrollTop + 4);

      setFirstScrollOk(true);
    }
  }, [weeks, scrollToWeek]);

  // set scrollTop 2
  useEffect(() => {
    let scrollTop = Number(sessionStorage.getItem('fixture-saved:fixture-scollTop') ?? 0);

    if (weeks.length > 0 && scrollTop === 0 && scrollToWeek > 0) {
      setTimeout(() => {
        const totalWeekHeight = (scrollToWeek - 1) * DEFAULT_WEEK_HEIGHT;
        const totalGap = (scrollToWeek - 2) * WEEK_GAP;
        const totalDaysHeight = weeks.filter((day) => day[0][0].week < scrollToWeek && day[0][0].date !== null).reduce((previousValue, currentValue) => previousValue + currentValue.length, 0) * DAY_TEXT_HEIGHT;
        const marginTop = 4 * 8;
        const totalHeight = totalWeekHeight + totalGap + totalDaysHeight + marginTop;
  
        window.scrollTo({
          top: totalHeight,
          left: 0,
          behavior: 'smooth'
        });

        setFirstScrollOk(true);
      }, 300);
    }
  }, [weeks, scrollToWeek]);

  // List prop
  const rowRenderer = ({index, isScrolling, isVisible, key, style}) => {
    return (
      <span key={key} style={style}>
        {!isVisible &&
          <FixtureListWeekBoxPlaceholder
            week={weeks[index][0][0].week}
            height={DEFAULT_WEEK_HEIGHT}
          />
        }

        {isVisible &&
          <FixtureListWeekBox
            days={weeks[index]}
          />
        }
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

  return (
    <div>
      <WindowScroller>
        {({height, width, isScrolling, scrollTop, registerChild, onChildScroll}) => {
          if (firstScrollOk) {
            if (scrollTop > 60) {
              sessionStorage.setItem('fixture-saved:fixture-scollTop', scrollTop + 60);
            } else {
              sessionStorage.removeItem('fixture-saved:fixture-scollTop');
            }
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

FixtureList.defaultProps = {
  weeks: [],
  scrollToWeek: 0,
}

FixtureList.propTypes = {
  weeks: PropTypes.array,
  scrollToWeek: PropTypes.number
}

export default FixtureList;
