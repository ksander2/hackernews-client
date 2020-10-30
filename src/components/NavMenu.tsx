import React from 'react';
import { NavLink } from 'react-router-dom';

type ListMenuItem = {
  name: string;
  url: string;
};
const listMenuItem: ListMenuItem[] = [
  { name: 'Top', url: '/top' },
  { name: 'Ask', url: '/ask' },
  { name: 'Job', url: '/job' },
  { name: 'Show', url: '/show' },
];

export const NavMenu: React.FC = () => {
  return (
    <div>
      {listMenuItem.map((item) => (
        <NavLink
          key={`menu-item-${item.name}`}
          activeClassName="active"
          id={`id-item-${item.name}`}
          to={item.url}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};
