import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { Story } from '../models/story';
import { AppThunk, RequestInfo } from './types';
import {
  getTopStoriesIdArray,
  getStoriesByArrayId,
} from '../service/hackerNewsService';

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

export const fetchStories = (): AppThunk => async (dispatch) => {
  dispatch(fetchStoriesRequest());
  try {
    const ids = await getTopStoriesIdArray();
    const stories = await getStoriesByArrayId(ids.splice(0, 20));
    dispatch(fetchStoriesSucceed(stories));
  } catch (e) {
    dispatch(fetchStoriesFailed());
  }
};

export const { selectAll } = storyAdapter.getSelectors();

export default storiesSlice.reducer;
