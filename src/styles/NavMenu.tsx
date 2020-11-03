import styled from '@emotion/styled';
import css from '@emotion/css';
import * as Colors from '../common/Colors';

export const NavMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  background-color: ${Colors.Gray};
  overflow: hidden;
  margin-bottom: 50px;
`;

export const NavLinkStyle = css`
  display: block;
  color: ${Colors.WeakGray};
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
