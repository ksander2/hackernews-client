import { connect } from 'react-redux';
import { fetchStories } from '../store/storiesStore';
import { StoriesView } from '../components/StoriesView';

const mapDispatchToProps = {
  fetchStories,
};

export default connect(null, mapDispatchToProps)(StoriesView);
