import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/core';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { GlobalStyles } from '../styles/GlobalStyles';
import { NavMenu } from './NavMenu';
import DefaultPage from './DefaultPage';
import { PageNotFound } from './PageNotFound';
import { BodyWrapper } from '../styles/App';
import StoriesListView from '../containers/StoriesListViewContainer';
import rootReducer from '../store/rootReducer';

const emotionCache = createCache();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware(),
});

const listMenuItem: string[] = ['top', 'ask', 'job', 'show'];

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Router basename="/">
          <Global styles={GlobalStyles} />
          <BodyWrapper>
            <NavMenu menuItems={listMenuItem} />
            <Switch>
              <Route exact path="/" component={DefaultPage} />
              <Route
                path={listMenuItem.map((item) => `/${item}`)}
                component={() => <StoriesListView />}
              />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </BodyWrapper>
        </Router>
      </Provider>
    </CacheProvider>
  );
};

export default App;
