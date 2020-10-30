import styled from '@emotion/styled';
import css from '@emotion/css';
import * as Colors from './Colors';

export const NavMenuWrapper = styled('div')`
  background-color: #393c3e;
  overflow: hidden;
  margin-bottom: 50px;
`;

export const NavLinkStyle = css`
  float: left;
  display: block;
  color: #bfbebe;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;

  &:hover {
    background-color: ${Colors.WeakGray};
    color: black;
  }

  &.active {
    color: ${Colors.White};
    background-color: ${Colors.Green};
  }
`;