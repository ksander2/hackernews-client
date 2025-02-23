import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { Story, StoriesIds } from '../types/story';
import { RequestInfo } from './types';
import { getStoriesByArrayId } from '../service/hackerNewsService';

let abortController: AbortController | null = null;

const storyAdapter = createEntityAdapter<Story, number>({
  selectId: (story: Story) => story.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const getInitialState = (): EntityState<Story, number> & RequestInfo =>
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

type FetchStoriesType = {
  ids: StoriesIds;
  isNew: boolean;
}

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async ({ids, isNew}: FetchStoriesType, thunkAPI) => {
    if (abortController) {
      abortController.abort();
    }
    thunkAPI.dispatch(fetchStoriesRequest());
    try {
      abortController = new AbortController();
      const stories = await getStoriesByArrayId(ids, abortController.signal);
      if (isNew) {
        thunkAPI.dispatch(fetchStoriesSucceed(stories));
      } else {
        thunkAPI.dispatch(fetchNextPageStoriesSucceed(stories));
      }
    } catch (e) {
      console.log(e);
      thunkAPI.dispatch(fetchStoriesFailed());
    }
  },
)

export const { selectAll, selectTotal } = storyAdapter.getSelectors();

export default storiesSlice.reducer;
