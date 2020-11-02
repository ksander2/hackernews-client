import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchStory } from '../hooks/useFetchStory';
import { Loader } from './Loader';
import { LoaderWrapper } from '../styles/Loader';
import { StoryWrapper, StoryTitle } from '../styles/CommentsListView';

type StoryUrlParams = {
  storyId: string;
};

type CommentsListViewProps = {
  do1?: string;
};

export const CommentsListView: React.FC<CommentsListViewProps> = ({ do1 }) => {
  const { storyId } = useParams<StoryUrlParams>();

  const [story, storyLoadStage] = useFetchStory(storyId);

  return storyLoadStage === 'requested' ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <StoryWrapper>
      <StoryTitle>{story?.title}</StoryTitle>
      <span>
        {story?.score} points by {story?.by} | comments: {story?.descendants}
      </span>
    </StoryWrapper>
  );
};
