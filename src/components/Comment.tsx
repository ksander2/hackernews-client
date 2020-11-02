/** @jsx jsx */
import { jsx } from '@emotion/core';
import parse from 'html-react-parser';
import React, { useMemo } from 'react';
import { Story } from '../types/story';
import { CommentsWrapper, CommentsAttributes } from '../styles/Comment';
import { hoursAgoFromDate } from '../utils';

type CommentProps = {
  data: Story;
};

export const Comment: React.FC<CommentProps> = ({ data }) => {
  const hourAgo = useMemo(() => hoursAgoFromDate(data.time), [data.time]);
  return (
    <CommentsWrapper>
      <CommentsAttributes>{` by ${data.by} | ${hourAgo} hours ago`}</CommentsAttributes>
      <div>{parse(data?.text ?? '')}</div>
    </CommentsWrapper>
  );
};
