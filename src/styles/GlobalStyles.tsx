import styled, { createGlobalStyle } from 'styled-components';
import { WeakGray, DarkerGray } from '../common/Colors';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Nunito-sans';
    font-weight: 200;
    font-style: normal;
    font-stretch: normal;
  }

  body {
    margin: 0;

    background-color: ${DarkerGray};

    color: ${WeakGray};
    font-family: 'Nunito-sans', sans-serif;
    font-weight: 400;
  }

  p {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  textarea {
    font-family: inherit;
  }

  button {
    font-family: inherit;
  }
`;

export const TopFixedContainer = styled('div')`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  flex-shrink: 0;
`;
