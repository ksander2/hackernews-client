import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

export const StoryLink = styled(Link)`
  font-size: 12px;
  color: ${Colors.WeakGray};
  text-decoration: underline;
`;
