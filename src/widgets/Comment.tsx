import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import React, { useMemo, memo } from 'react';
import { Story } from '../app/types/story';
import { CommentsWrapper, CommentsAttributes } from '../app/styles/Comment';
import { hoursAgoFromDate } from '../app/utils';

type CommentProps = {
  data: Story;
};

export const Comment: React.FC<CommentProps> = memo(({ data }) => {
  const { t } = useTranslation('views');
  const hourAgo = useMemo(() => hoursAgoFromDate(data.time), [data.time]);
  return (
    <CommentsWrapper>
      <CommentsAttributes>{` ${t('commentsView.by')} ${
        data.by
      } | ${hourAgo} ${t('hoursAgo')}`}</CommentsAttributes>
      <div>{parse(data?.text ?? '')}</div>
    </CommentsWrapper>
  );
});
