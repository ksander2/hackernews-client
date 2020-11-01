import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { Story } from '../models/story';
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
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const storiesSlice = createSlice({
  name: 'stories',
  initialState: storyAdapter.getInitialState<RequestInfo>({
    loadStage: 'none',
  }),
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
  },
});

const {
  fetchStoriesRequest,
  fetchStoriesSucceed,
  fetchStoriesFailed,
} = storiesSlice.actions;

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
): AppThunk => async (dispatch) => {
  dispatch(fetchStoriesRequest());
  try {
    const ids = await getStoriesIds(categoryStories);
    const stories = await getStoriesByArrayId(ids.splice(0, 10));
    dispatch(fetchStoriesSucceed(stories));
  } catch (e) {
    console.log(e);
    dispatch(fetchStoriesFailed());
  }
};

export const { selectAll } = storyAdapter.getSelectors();

export default storiesSlice.reducer;
