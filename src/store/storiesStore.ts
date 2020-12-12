import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { Story, StoriesIds } from '../types/story';
import { AppThunk, RequestInfo } from './types';
import { getStoriesByArrayId } from '../service/hackerNewsService';

let abortController: AbortController | null = null;

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
    fetchNextPageStoriesSucceed(state, { payload }: PayloadAction<Story[]>) {
      state.loadStage = 'succeeded';
      storyAdapter.addMany(state, payload);
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
  fetchNextPageStoriesSucceed,
} = storiesSlice.actions;

export const { resetStories } = storiesSlice.actions;

export const fetchStories = (
  ids: StoriesIds,
  isNew: boolean,
): AppThunk => async (dispatch) => {
  if (abortController) {
    abortController.abort();
  }
  dispatch(fetchStoriesRequest());
  try {
    abortController = new AbortController();
    const stories = await getStoriesByArrayId(ids, abortController.signal);
    if (isNew) {
      dispatch(fetchStoriesSucceed(stories));
    } else {
      dispatch(fetchNextPageStoriesSucceed(stories));
    }
  } catch (e) {
    console.log(e);
    dispatch(fetchStoriesFailed());
  }
};

export const { selectAll, selectTotal } = storyAdapter.getSelectors();

export default storiesSlice.reducer;
