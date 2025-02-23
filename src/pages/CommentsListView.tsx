import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetchStory } from '../app/hooks/useFetchStory';
import { useFetchComments } from '../app/hooks/useFetchComments';
import { Loader } from '../shared/Loader';
import { LoaderWrapper } from '../app/styles/Loader';
import {
  StoryWrapper,
  StoryTitle,
  CommentsListWrapper,
} from '../app/styles/CommentsListView';
import { LoadStage } from '../app/store/types';
import { Comment } from '../widgets/Comment';

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
  const { t } = useTranslation('views');
  const { storyId } = useParams<StoryUrlParams>();

  const [story, storyLoadStage] = useFetchStory(storyId ?? '');
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
          {story?.score} {t('commentsView.pointsBy')} {story?.by} |{' '}
          {t('commentsView.comments')}: {story?.descendants}
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
