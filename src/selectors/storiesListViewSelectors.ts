import { createSelector } from '@reduxjs/toolkit';

import { State } from '../store/types';
import { isLoading } from '../store/selectors';
import { selectAll as selectAllStories } from '../store/storiesStore';

const getStoriesState = createSelector(
  (state: State) => state.stories,
  (state) => state,
);

export const isStoriesLoading = createSelector(getStoriesState, (state) =>
  isLoading(state),
);

export const getStories = createSelector(getStoriesState, (state) =>
  selectAllStories(state),
);
