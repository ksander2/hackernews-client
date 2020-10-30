import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/core';
import { GlobalStyles } from './styles/GlobalStyles';

const emotionCache = createCache();

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <Global styles={GlobalStyles} />
      <div>test</div>
    </CacheProvider>
  );
};

export default App;
