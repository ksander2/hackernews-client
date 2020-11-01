import React from 'react';
import { Dot } from 'react-animated-dots';
import { LoaderWrapper } from '../styles/Loader';

export const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <h3>
        <Dot>.</Dot>
        <Dot>.</Dot>
        <Dot>.</Dot>
      </h3>
    </LoaderWrapper>
  );
};
