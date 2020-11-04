import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Loader } from './Loader';
import { Story, StoriesIds } from '../types/story';
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

type StoriesListViewProps = {
  isLoading: boolean;
  fetchStories: (ids: StoriesIds, isNew: boolean) => void;
  resetStories: () => void;
  stories: Story[];
  hasData: boolean;
};

export const StoriesListView: React.FC<StoriesListViewProps> = ({
  fetchStories,
  isLoading,
  stories,
  hasData,
  resetStories,
}) => {
  const { t } = useTranslation('views');
  const [page, setPage] = useState<number>(1);
  const { pathname } = useLocation();

  const category = useMemo(() => pathToCategory(pathname), [pathname]);
  const [storiesIds, idsLoadStage] = useFetchStoriesIds(category);

  useEffect(() => {
    resetStories();
    setPage(1);
  }, [category, setPage]);

  useEffect(() => {
    if (storiesIds) {
      fetchStories(storiesIds.slice(0, countStoriesByPage), true);
    }
  }, [storiesIds]);

  const handleLoadMoreClick = useCallback(() => {
    if (storiesIds) {
      const nextPageIds = storiesIds.splice(
        page * countStoriesByPage,
        countStoriesByPage,
      );
      fetchStories(nextPageIds, false);
      setPage((prev) => prev + 1);
    }
  }, [setPage, storiesIds, page, fetchStories]);

  return (
    <StoryListWrapper>
      {idsLoadStage === 'requested' || !hasData ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          {stories.map((story) => (
            <StoryView key={`st-${story.id}`} story={story} />
          ))}
          <LoadMoreButton onClick={handleLoadMoreClick}>
            {isLoading && hasData ? (
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
