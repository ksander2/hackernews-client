import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Loader } from './Loader';
import { pathToCategory } from '../mappers/pathToCategory';
import { StoryView } from './StoryView';
import {
  StoryListWrapper,
  LoadMoreButton,
  ButtonLoaderWrapper,
} from '../styles/StoriesListView';
import { LoaderWrapper } from '../styles/Loader';
import { countStoriesByPage } from '../common/Constants';
import { useFetchStoriesIds } from '../hooks/useFetchStoriesIds';
import { useSelector } from 'react-redux';
import { getStories, hasData, isStoriesLoading } from '../selectors/storiesListViewSelectors';
import { fetchStories, resetStories } from '../store/storiesStore';
import { useAppDispatch } from '../types/store';

export const StoriesListView: React.FC = () => {
  const { t } = useTranslation('views');
  const [page, setPage] = useState<number>(1);
  const { pathname } = useLocation();
  const isLoading = useSelector(isStoriesLoading);
  const stories = useSelector(getStories);
  const chekHasData = useSelector(hasData);
  const dispatch = useAppDispatch();

  const category = useMemo(() => pathToCategory(pathname), [pathname]);
  const [storiesIds, idsLoadStage] = useFetchStoriesIds(category);

  useEffect(() => {
    dispatch(resetStories());
    setPage(1);
  }, [category, setPage, dispatch]);

  useEffect(() => {
    if (storiesIds) {
      dispatch(fetchStories({
        ids: storiesIds.slice(0, countStoriesByPage), isNew: true
      }));
    }
  }, [storiesIds, dispatch]);

  const handleLoadMoreClick = useCallback(() => {
    if (storiesIds) {
      const nextPageIds = storiesIds.splice(
        page * countStoriesByPage,
        countStoriesByPage,
      );
      dispatch(fetchStories({ ids: nextPageIds, isNew: false }));
      setPage((prev) => prev + 1);
    }
  }, [setPage, storiesIds, page, fetchStories]);

  return (
    <StoryListWrapper>
      {idsLoadStage === 'requested' || !chekHasData ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          {stories.map((story) => (
            <StoryView key={`st-${story.id}`} story={story} />
          ))}
          <LoadMoreButton onClick={handleLoadMoreClick}>
            {isLoading && chekHasData ? (
              <ButtonLoaderWrapper>
                <Loader />
              </ButtonLoaderWrapper>
            ) : (
              t('storiesView.loadMoreBtn')
            )}
          </LoadMoreButton>
        </>
      )}
    </StoryListWrapper>
  );
};
