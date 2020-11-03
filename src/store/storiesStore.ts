import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { Story } from '../types/story';
import { AppThunk, RequestInfo } from './types';
import {
  getTopStoriesIdArray,
  getAskStoriesIdArray,
  getJobStoriesIdArray,
  getShowStoriesIdArray,
  getStoriesByArrayId,
} from '../service/hackerNewsService';
import { CategoryStories } from '../types/common';

const storyAdapter = createEntityAdapter<Story>({
  selectId: (story) => story.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const getInitialState = (): EntityState<Story> & RequestInfo =>
  storyAdapter.getInitialState<RequestInfo>({
    loadStage: 'none',
  });

const storiesSlice = createSlice({
  name: 'stories',
  initialState: getInitialState(),
  reducers: {
    fetchStoriesRequest(state) {
      state.loadStage = 'requested';
    },
    fetchStoriesSucceed(state, { payload }: PayloadAction<Story[]>) {
      state.loadStage = 'succeeded';
      storyAdapter.setAll(state, payload);
    },
    fetchStoriesFailed(state) {
      state.loadStage = 'failed';
    },
    resetStories: () => getInitialState(),
  },
});

export const {
  fetchStoriesRequest,
  fetchStoriesSucceed,
  fetchStoriesFailed,
} = storiesSlice.actions;

export const { resetStories } = storiesSlice.actions;

function getStoriesIds(categoryStories: CategoryStories) {
  switch (categoryStories) {
    case 'top':
      return getTopStoriesIdArray();
    case 'ask':
      return getAskStoriesIdArray();
    case 'job':
      return getJobStoriesIdArray();
    case 'show':
      return getShowStoriesIdArray();
    default:
      throw Error(`unsupported category: ${categoryStories}`);
  }
}
export const fetchStories = (
  categoryStories: CategoryStories,
  count: number,
): AppThunk => async (dispatch) => {
  dispatch(fetchStoriesRequest());
  try {
    const ids = await getStoriesIds(categoryStories);
    const stories = await getStoriesByArrayId(ids.sort().splice(0, count));
    dispatch(fetchStoriesSucceed(stories));
  } catch (e) {
    console.log(e);
    dispatch(fetchStoriesFailed());
  }
};

export const { selectAll, selectTotal } = storyAdapter.getSelectors();

export default storiesSlice.reducer;
