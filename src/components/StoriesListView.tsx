import React, { useEffect } from 'react';
import { CategoryStories } from '../types/common';
import { Loader } from './Loader';
import { Story } from '../models/story';
import { StoryView } from './StoryView';
import { StoryListWrapper, LoadMoreButton } from '../styles/StoriesListView';

type StoriesListViewProps = {
  isLoading: boolean;
  category: CategoryStories;
  fetchStories: (category: CategoryStories) => void;
  stories: Story[];
};

export const StoriesListView: React.FC<StoriesListViewProps> = ({
  fetchStories,
  isLoading,
  stories,
  category,
}) => {
  useEffect(() => {
    fetchStories(category);
  }, [category]);

  function handleLoadMoreClick() {
    console.log('test');
  }

  return (
    <StoryListWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {stories.map((story) => (
            <StoryView key={`st-${story.id}`} story={story} />
          ))}
          <LoadMoreButton onClick={handleLoadMoreClick}>
            Load more
          </LoadMoreButton>
        </>
      )}
    </StoryListWrapper>
  );
};
