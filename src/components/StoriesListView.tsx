import React, { useEffect, useState } from 'react';
import { CategoryStories } from '../types/common';
import { Loader } from './Loader';
import { Story } from '../types/story';
import { StoryView } from './StoryView';
import {
  StoryListWrapper,
  LoadMoreButton,
  LoaderWrapper,
  ButtonLoaderWrapper,
} from '../styles/StoriesListView';
import { countStoriesByPage } from '../common/Constants';

type StoriesListViewProps = {
  isLoading: boolean;
  category: CategoryStories;
  fetchStories: (category: CategoryStories, count: number) => void;
  resetStories: () => void;
  stories: Story[];
  hasData: boolean;
};

export const StoriesListView: React.FC<StoriesListViewProps> = ({
  fetchStories,
  isLoading,
  stories,
  category,
  hasData,
  resetStories,
}) => {
  const [countStories, setCountStories] = useState(countStoriesByPage);

  useEffect(() => {
    resetStories();
  }, [category]);

  useEffect(() => {
    fetchStories(category, countStories);
  }, [category, countStories]);

  function handleLoadMoreClick() {
    setCountStories((prev) => prev + countStoriesByPage);
  }

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
