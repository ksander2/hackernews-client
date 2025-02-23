import React, { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Story } from '../app/types/story';
import {
  StoryWrapper,
  StoryTitle,
  StoryAttributes,
  StoryLink,
} from '../app/styles/StoryView';
import { hoursAgoFromDate } from '../app/utils';

type StoryViewProps = {
  story: Story;
};

export const StoryView: React.FC<StoryViewProps> = memo(({ story }) => {
  const hourAgo = useMemo(() => hoursAgoFromDate(story.time), [story.time]);
  const { t } = useTranslation('views');
  const content = useMemo(() => {
    if (story.kids != null) {
      return `${story?.kids.length} comments`;
    }
    return 'discuss';
  }, [story]);

  const path = `/story/${story.id}/comments`;

  return (
    <StoryWrapper>
      <StoryTitle href={story.url}>{story.title}</StoryTitle>
      <div>
        <StoryAttributes>{`${story.score} ${t('storiesView.pointsBy')} ${
          story.by
        } | ${hourAgo} ${t('hoursAgo')} `}</StoryAttributes>
        <StoryLink to={path}>{content}</StoryLink>
      </div>
    </StoryWrapper>
  );
});
