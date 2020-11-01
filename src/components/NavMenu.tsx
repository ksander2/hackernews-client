/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavMenuWrapper, NavLinkStyle } from '../styles/NavMenu';

type NavMenuProps = {
  menuItems: string[];
};

export const NavMenu: React.FC<NavMenuProps> = ({ menuItems }) => {
  return (
    <NavMenuWrapper>
      {menuItems.map((item) => (
        <NavLink
          key={`menu-item-${item}`}
          css={NavLinkStyle}
          activeClassName="active"
          id={`id-item-${item}`}
          to={`/${item}`}
        >
          {item}
        </NavLink>
      ))}
    </NavMenuWrapper>
  );
};
