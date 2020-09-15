import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useTable from '../../hooks/useTable';

import AppLoader from '../../components/AppLoader';
import Table from './Table'

const PageTable = () => {
  const { season } = useSelector(state => state.data);
  const table = useTable(season);

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Puan Durumu';
  }, []);

  if (table.length === 0) {
    return <AppLoader />;
  }

  return (
    <div className="relative sm:max-w-lg py-4 mx-auto">
      <Table rows={table} />
    </div>
  );
};

export default PageTable;
