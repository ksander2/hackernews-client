import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router';
import { CategoryStories } from '../types/common';
import { Loader } from './Loader';
import { Story } from '../types/story';
import { pathToCategory } from '../mappers/pathToCategory';
import { StoryView } from './StoryView';
import {
  StoryListWrapper,
  LoadMoreButton,
  ButtonLoaderWrapper,
} from '../styles/StoriesListView';
import { LoaderWrapper } from '../styles/Loader';
import { countStoriesByPage } from '../common/Constants';

type StoriesListViewProps = {
  isLoading: boolean;
  fetchStories: (category: CategoryStories, count: number) => void;
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
  const [countStories, setCountStories] = useState(countStoriesByPage);
  const { pathname } = useLocation();

  const category = useMemo(() => pathToCategory(pathname), [pathname]);

  useEffect(() => {
    resetStories();
  }, [category]);

  useEffect(() => {
    fetchStories(category, countStories);
  }, [category, countStories]);

  const handleLoadMoreClick = useCallback(
    () => setCountStories((prev) => prev + countStoriesByPage),
    [setCountStories],
  );

  return (
    <StoryListWrapper>
      {isLoading && !hasData ? (
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
              'Load more'
            )}
          </LoadMoreButton>
        </>
      )}
    </StoryListWrapper>
  );
};
