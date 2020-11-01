import styled from '@emotion/styled';
import css from '@emotion/css';
import * as Colors from '../common/Colors';

export const StoryWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${Colors.DarkerGray};
  word-wrap: break-word;
`;

export const StoryTitle = styled.a`
  font-size: 20px;
  text-decoration: none;
  color: ${Colors.WeakGray};
`;

export const StoryAttributes = styled.span`
  font-size: 12px;
`;

export const StoryLink = css`
  font-size: 12px;
  color: ${Colors.WeakGray};
  text-decoration: underline;
`;
