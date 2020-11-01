/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Story } from '../types/story';
import {
  StoryWrapper,
  StoryTitle,
  StoryAttributes,
  StoryLink,
} from '../styles/StoryView';

import { hoursAgoFromDate } from '../utils';

type StoryViewProps = {
  story: Story;
};

export const StoryView: React.FC<StoryViewProps> = ({ story }) => {
  const hourAgo = useMemo(() => hoursAgoFromDate(story.time), [story.time]);

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
        <StoryAttributes>{`${story.score} points by ${story.by} | ${hourAgo} hours ago `}</StoryAttributes>
        <Link css={StoryLink} to={path}>
          {content}
        </Link>
      </div>
    </StoryWrapper>
  );
};
