/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavMenuWrapper, NavLinkStyle } from '../styles/NavMenu';
import { MenuItem } from '../types/nav';

type NavMenuProps = {
  menuItems: MenuItem[];
};

export const NavMenu: React.FC<NavMenuProps> = ({ menuItems }) => {
  return (
    <NavMenuWrapper>
      {menuItems.map((item) => (
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
