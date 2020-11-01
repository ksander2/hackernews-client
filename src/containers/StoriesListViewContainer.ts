import { connect } from 'react-redux';
import { fetchStories, resetStories } from '../store/storiesStore';
import { StoriesListView } from '../components/StoriesListView';
import { State } from '../store/types';
import {
  isStoriesLoading,
  getStories,
  hasData,
} from '../selectors/storiesListViewSelectors';

const mapStateToProps = (state: State) => ({
  isLoading: isStoriesLoading(state),
  stories: getStories(state),
  hasData: hasData(state),
});

const mapDispatchToProps = {
  fetchStories,
  resetStories,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesListView);
