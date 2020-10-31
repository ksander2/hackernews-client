import React, { useEffect } from 'react';
import { CategoryStories } from '../types/common';

type StoriesViewProps = {
  category: CategoryStories;
  fetchStories: () => void;
};

export const StoriesView: React.FC<StoriesViewProps> = ({
  category,
  fetchStories,
}) => {
  useEffect(() => {
    fetchStories();
  }, []);
  return <div>{category}</div>;
};
