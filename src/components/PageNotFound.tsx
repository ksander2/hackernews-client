import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type NotFoundProps = RouteComponentProps;

export const PageNotFound: React.FC<NotFoundProps> = ({ location }) => (
  <div>
    <span>Nothing was found for {location.pathname}</span>
  </div>
);
