import resources from './resources';

export const config = {
  interpolation: { escapeValue: false },
  lng: 'en',
  fallbackLng: 'en',
  cache: {
    enabled: true,
  },
  resources,
};
export { resources };
