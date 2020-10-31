import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { Story } from '../models/story';
import { AppThunk } from './types';
import {
  getTopStoriesIdArray,
  getStoriesByArrayId,
} from '../service/hackerNewsService';

const storyAdapter = createEntityAdapter<Story>({
  selectId: (story) => story.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export type LoadStage = 'none' | 'requested' | 'succeeded' | 'failed';

type StoriesState = EntityState<Story> & {
  loadStage: LoadStage;
};

const initialState: StoriesState = storyAdapter.getInitialState({
  loadStage: 'none',
});

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
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

export default storiesSlice.reducer;
