import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { GlobalStyles } from '../styles/GlobalStyles';
import { NavMenu } from './NavMenu';
import DefaultPage from './DefaultPage';
import { PageNotFound } from './PageNotFound';
import { BodyWrapper } from '../styles/App';
import { CommentsListView } from './CommentsListView';
import ErrorBoundary from './ErrorBoundary';
import { config as i18nextConfig } from '../misc/translations/index';
import { StoriesListView } from './StoriesListView';
import { store } from '../storeConfig';

i18next.init(i18nextConfig);

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
              <Routes>
                <Route path="/" element={<DefaultPage />} />
                {listMenuItem.map((item) =>
                  <Route
                    key={`k-${item}`}
                    path={`/${item}`}
                    element={<StoriesListView />}
                  />)}
                <Route
                  path="/story/:storyId/comments"
                  element={<CommentsListView />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BodyWrapper>
          </ErrorBoundary>
        </Router>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
