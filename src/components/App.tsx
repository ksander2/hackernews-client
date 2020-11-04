import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { GlobalStyles } from '../styles/GlobalStyles';
import { NavMenu } from './NavMenu';
import DefaultPage from './DefaultPage';
import { PageNotFound } from './PageNotFound';
import { BodyWrapper } from '../styles/App';
import StoriesListView from '../containers/StoriesListViewContainer';
import { CommentsListView } from './CommentsListView';
import ErrorBoundary from './ErrorBoundary';
import rootReducer from '../store/rootReducer';
import { config as i18nextConfig } from '../misc/translations/index';

i18next.init(i18nextConfig);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware(),
});

const listMenuItem: string[] = ['top', 'ask', 'job', 'show'];

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <Router basename="/">
          <GlobalStyles />
          <ErrorBoundary>
            <BodyWrapper>
              <NavMenu menuItems={listMenuItem} />
              <Switch>
                <Route exact path="/" component={DefaultPage} />
                <Route
                  path={listMenuItem.map((item) => `/${item}`)}
                  component={() => <StoriesListView />}
                />
                <Route
                  path="/story/:storyId/comments"
                  component={CommentsListView}
                />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </BodyWrapper>
          </ErrorBoundary>
        </Router>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
