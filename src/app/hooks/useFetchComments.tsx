import { useState, useEffect } from 'react';
import { LoadStage } from '../store/types';
import { Story } from '../types/story';
import { getStoryById } from '../service/hackerNewsService';

export function useFetchComments(
  ids: number[] | undefined,
): [Story[] | null, LoadStage] {
  const [comments, setComments] = useState<Story[] | null>(null);
  const [loadStageComments, setLoadStageComments] = useState<LoadStage>('none');

  useEffect(() => {
    if (ids === undefined) {
      return;
    }
    setLoadStageComments('requested');

    Promise.all(ids.map((item) => getStoryById(item)))
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setLoadStageComments('succeeded');
      })
      .catch((e) => {
        console.log(e);
        setLoadStageComments('failed');
      });
  }, [ids, setComments, setLoadStageComments]);

  return [comments, loadStageComments];
}
