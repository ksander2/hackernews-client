import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/core';
import { GlobalStyles } from '../styles/GlobalStyles';
import { NavMenu } from './NavMenu';
import DefaultPage from './DefaultPage';
import { PageNotFound } from './PageNotFound';
import { BodyWrapper } from '../styles/App';

import { StoriesView } from './StoriesView';

const emotionCache = createCache();

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <Router basename="/">
        <Global styles={GlobalStyles} />
        <BodyWrapper>
          <NavMenu />
          <Switch>
            <Route exact path="/" component={DefaultPage} />
            <Route
              path="/top"
              component={() => <StoriesView category="top" />}
            />
            <Route
              path="/ask"
              component={() => <StoriesView category="ask" />}
            />
            <Route
              path="/job"
              component={() => <StoriesView category="job" />}
            />
            <Route
              path="/show"
              component={() => <StoriesView category="show" />}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </BodyWrapper>
      </Router>
    </CacheProvider>
  );
};

export default App;
