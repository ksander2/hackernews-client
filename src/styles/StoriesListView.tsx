import styled from '@emotion/styled';
import * as Colors from '../common/Colors';

export const StoryListWrapper = styled.div`
  border-radius: 5px;
  background-color: ${Colors.Gray};
  color: ${Colors.WeakGray};
  margin-bottom: 1px;
`;

export const LoadMoreButton = styled.button`
  background-color: ${Colors.Transparent};
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  height: 50px;
  width: 100%;
  color: ${Colors.WeakGray};
  font-size: 17px;
`;
