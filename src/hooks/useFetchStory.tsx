import { useState, useEffect } from 'react';
import { LoadStage } from '../store/types';
import { Story } from '../types/story';
import { getStoryById } from '../service/hackerNewsService';

export function useFetchStory(id: string): [Story | null, LoadStage] {
  const [story, setStory] = useState<Story | null>(null);
  const [loadStageStory, setLoadStageStory] = useState<LoadStage>('none');

  useEffect(() => {
    setLoadStageStory('requested');
    getStoryById(Number(id))
      .then((res) => {
        setStory(res);
        setLoadStageStory('succeeded');
      })
      .catch((e) => {
        console.log(e);
        setLoadStageStory('failed');
      });
  }, [id, setLoadStageStory, setStory]);

  return [story, loadStageStory];
}
