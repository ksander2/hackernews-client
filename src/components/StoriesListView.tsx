import React, { useEffect } from 'react';
import { CategoryStories } from '../types/common';
import { Loader } from './Loader';
import { Story } from '../models/story';

type StoriesListViewProps = {
  isLoading: boolean;
  category: CategoryStories;
  fetchStories: () => void;
  stories: Story[];
};

export const StoriesListView: React.FC<StoriesListViewProps> = ({
  category,
  fetchStories,
  isLoading,
}) => {
  useEffect(() => {
    fetchStories();
  }, []);
  return isLoading ? <Loader /> : <div>{category}</div>;
};
