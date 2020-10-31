import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from '../models/story';
import { AppThunk } from './types';
import {
  getTopStoriesIdArray,
  getStoriesByArrayId,
} from '../service/hackerNewsService';

export type LoadStage = 'none' | 'requested' | 'succeeded' | 'failed';

type StoriesState = {
  data: Story[];
  loadStage: LoadStage;
};

const defaultStoriesState: StoriesState = { data: [], loadStage: 'none' };

const storiesSlice = createSlice({
  name: 'stories',
  initialState: defaultStoriesState,
  reducers: {
    fetchStoriesRequest(state) {
      state.loadStage = 'requested';
    },
    fetchStoriesSucceed(state, { payload }: PayloadAction<Story[]>) {
      state.loadStage = 'succeeded';
      state.data = payload;
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

export default storiesSlice.reducer;
