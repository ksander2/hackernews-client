import storiesReducer, {
  getInitialState,
  fetchStoriesRequest,
  fetchStoriesSucceed,
} from '../store/storiesStore';
import { Story } from '../types/story';

describe('stories reducer tests', () => {
  it('check load stage', () => {
    const initialState = getInitialState();

    expect(storiesReducer(initialState, fetchStoriesRequest)).toEqual({
      ...initialState,
      loadStage: 'requested',
    });
  });

  it('check payload', () => {
    const initialState = getInitialState();
    const id = 121;
    const newStory: Story = {
      id,
      by: 'author',
      dead: false,
      deleted: false,
      descendants: 30,
      kids: [],
      parent: 123,
      score: 3,
      text: 'test',
      time: 123456,
      title: 'testTitle',
      type: 'story',
      url: '123',
    };
    const storiesArray = [newStory];
    const fetchStoriesSucceedAction = fetchStoriesSucceed(storiesArray);
    const state = storiesReducer(initialState, fetchStoriesSucceedAction);

    expect(state.ids).toContain(id);
    expect(Object.keys(state.entities)[0]).toEqual(String(id));
    expect(Object.keys(state.entities).length).toEqual(1);
    expect(state.loadStage).toEqual('succeeded');
  });
});
