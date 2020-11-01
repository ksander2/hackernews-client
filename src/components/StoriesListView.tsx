import React, { useEffect } from 'react';
import { CategoryStories } from '../types/common';
import { Loader } from './Loader';
import { Story } from '../models/story';
import { StoryView } from './StoryView';
import { StoryListWrapper } from '../styles/StoriesListView';

type StoriesListViewProps = {
  isLoading: boolean;
  category: CategoryStories;
  fetchStories: () => void;
  stories: Story[];
};

export const StoriesListView: React.FC<StoriesListViewProps> = ({
  fetchStories,
  isLoading,
  stories,
}) => {
  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <StoryListWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        stories.map((story) => <StoryView story={story} />)
      )}
    </StoryListWrapper>
  );
};
