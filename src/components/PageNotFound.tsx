import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type NotFoundProps = RouteComponentProps;

export const PageNotFound: React.FC<NotFoundProps> = ({ location }) => {
  const { t } = useTranslation('pageNotFound');
  return (
    <span>
      {t('pageNotFound')} {location.pathname}
    </span>
  );
};
