import React from 'react';
import { Story } from '../models/story';

type StoryViewProps = {
  story: Story;
};

export const StoryView: React.FC<StoryViewProps> = ({ story }) => {
  return <div>{story.title}</div>;
};
