import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { Story, StoriesIds } from '../types/story';
import { AppThunk, RequestInfo } from './types';
import { getStoriesByArrayId } from '../service/hackerNewsService';

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
  dispatch(fetchStoriesRequest());
  try {
    const stories = await getStoriesByArrayId(ids);
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
