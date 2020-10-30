/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavMenuWrapper, NavLinkStyle } from '../styles/NavMenu';

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
    <NavMenuWrapper>
      {listMenuItem.map((item) => (
        <NavLink
          key={`menu-item-${item.name}`}
          css={NavLinkStyle}
          activeClassName="active"
          id={`id-item-${item.name}`}
          to={item.url}
        >
          {item.name}
        </NavLink>
      ))}
    </NavMenuWrapper>
  );
};
