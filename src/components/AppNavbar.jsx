import React from 'react';
import { NavLink } from 'react-router-dom';

const AppNavbar = () => (
  <nav className="sticky left-0 top-0 right-0 bg-purple-600 z-10">
    <span className="sm:max-w-lg grid grid-cols-2 mx-auto">
      <NavLink
        className="flex items-center justify-center border-b-4 border-transparent active:bg-purple-700 text-white leading-none py-3"
        activeClassName="border-purple-800 pointer-events-none"
        to="/fixture"
      >Fikstür</NavLink>

      <NavLink
        className="flex items-center justify-center border-b-4 border-transparent active:bg-purple-700 text-white leading-none py-3"
        activeClassName="border-purple-800 pointer-events-none"
        to="/table"
      >Puan Durumu</NavLink>
    </span>
  </nav>
);

export default AppNavbar;
