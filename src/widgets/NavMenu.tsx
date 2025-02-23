import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavMenuWrapper, NavLinkStyled } from '../app/styles/NavMenu';

type NavMenuProps = {
  menuItems: string[];
};

export const NavMenu: React.FC<NavMenuProps> = ({ menuItems }) => {
  const { t } = useTranslation('navMenu');
  return (
    <NavMenuWrapper>
      {menuItems.map((item) => (
        <NavLinkStyled
          key={`menu-item-${item}`}
          id={`id-item-${item}`}
          to={`/${item}`}
        >
          {t(item)}
        </NavLinkStyled>
      ))}
    </NavMenuWrapper>
  );
};
