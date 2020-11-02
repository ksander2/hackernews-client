import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchStory } from '../hooks/useFetchStory';
import { useFetchComments } from '../hooks/useFetchComments';
import { Loader } from './Loader';
import { LoaderWrapper } from '../styles/Loader';
import {
  StoryWrapper,
  StoryTitle,
  CommentsListWrapper,
} from '../styles/CommentsListView';
import { LoadStage } from '../store/types';
import { Comment } from './Comment';

type StoryUrlParams = {
  storyId: string;
};

function useIsLoading(
  storyLoadStage: LoadStage,
  commentsLoadStage: LoadStage,
): boolean {
  return storyLoadStage === 'requested' || commentsLoadStage === 'requested';
}

export const CommentsListView: React.FC = () => {
  const { storyId } = useParams<StoryUrlParams>();

  const [story, storyLoadStage] = useFetchStory(storyId);
  const [comments, commentsLoadStage] = useFetchComments(story?.kids);

  const isLoading = useIsLoading(storyLoadStage, commentsLoadStage);

  return isLoading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <>
      <StoryWrapper>
        <StoryTitle>{story?.title}</StoryTitle>
        <span>
          {story?.score} points by {story?.by} | comments: {story?.descendants}
        </span>
      </StoryWrapper>
      <CommentsListWrapper>
        {comments?.map((comment) => (
          <Comment key={`key-comment-${comment.id}`} data={comment} />
        ))}
      </CommentsListWrapper>
    </>
  );
};
