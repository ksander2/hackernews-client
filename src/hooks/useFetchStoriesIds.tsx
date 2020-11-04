import { useState, useEffect } from 'react';
import { LoadStage } from '../store/types';
import { StoriesIds } from '../types/story';
import { CategoryStories } from '../types/common';
import {
  getTopStoriesIdArray,
  getAskStoriesIdArray,
  getJobStoriesIdArray,
  getShowStoriesIdArray,
} from '../service/hackerNewsService';

function getStoriesIds(categoryStories: CategoryStories) {
  switch (categoryStories) {
    case 'top':
      return getTopStoriesIdArray();
    case 'ask':
      return getAskStoriesIdArray();
    case 'job':
      return getJobStoriesIdArray();
    case 'show':
      return getShowStoriesIdArray();
    default:
      throw Error(`unsupported category: ${categoryStories}`);
  }
}

export function useFetchStoriesIds(
  categoryStories: CategoryStories,
): [StoriesIds | null, LoadStage] {
  const [storiesIds, setStoriesIds] = useState<StoriesIds | null | null>(null);
  const [loadStageStory, setLoadStageStory] = useState<LoadStage>('none');

  useEffect(() => {
    setLoadStageStory('requested');
    getStoriesIds(categoryStories)
      .then((res) => {
        setStoriesIds(res.sort((a, b) => a - b));
        setLoadStageStory('succeeded');
      })
      .catch((e) => {
        console.log(e);
        setLoadStageStory('failed');
      });
  }, [categoryStories, setLoadStageStory, setStoriesIds]);

  return [storiesIds, loadStageStory];
}
