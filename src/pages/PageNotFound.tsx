import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

export const PageNotFound: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation('pageNotFound');
  return (
    <span>
      {t('pageNotFound')} {location.pathname}
    </span>
  );
};
