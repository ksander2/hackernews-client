import { connect } from 'react-redux';
import { fetchStories } from '../store/storiesStore';
import { StoriesListView } from '../components/StoriesListView';
import { State } from '../store/types';
import {
  isStoriesLoading,
  getStories,
} from '../selectors/storiesListViewSelectors';

const mapStateToProps = (state: State) => ({
  isLoading: isStoriesLoading(state),
  stories: getStories(state),
});

const mapDispatchToProps = {
  fetchStories,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesListView);
