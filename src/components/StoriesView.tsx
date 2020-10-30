import React from 'react';
import { CategoryStories } from '../types/common';

type StoriesViewProps = {
  category: CategoryStories;
};

export const StoriesView: React.FC<StoriesViewProps> = ({ category }) => {
  return <div>{category}</div>;
};
