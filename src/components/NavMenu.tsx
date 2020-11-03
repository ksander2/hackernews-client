/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavMenuWrapper, NavLinkStyle } from '../styles/NavMenu';

type NavMenuProps = {
  menuItems: string[];
};

export const NavMenu: React.FC<NavMenuProps> = ({ menuItems }) => {
  const { t } = useTranslation('navMenu');
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
          {t(item)}
        </NavLink>
      ))}
    </NavMenuWrapper>
  );
};
