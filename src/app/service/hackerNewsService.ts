import {
  StoriesIdsApiModel,
  convertToStoriesIds,
  convertToStory,
  StoryApiModel,
} from '../models/apiModels';
import { StoriesIds, Story } from '../types/story';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const itemPath = 'item/';
const jsonFormat = '.json?print=pretty';

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(
      `HTTP error ${response.status} ${response.statusText} url: ${response.url}`,
    );
  }
  return response;
}

async function getStoriesIdArray(categoryPath: string): Promise<StoriesIds> {
  const responseApi = await fetch(`${baseUrl}${categoryPath}${jsonFormat}`)
    .then(handleErrors)
    .then((resp) => resp.json());
  const apiModel = StoriesIdsApiModel.check(responseApi);
  return convertToStoriesIds(apiModel);
}

export function getTopStoriesIdArray(): Promise<StoriesIds> {
  return getStoriesIdArray('topstories');
}

export function getAskStoriesIdArray(): Promise<StoriesIds> {
  return getStoriesIdArray('askstories');
}

export function getShowStoriesIdArray(): Promise<StoriesIds> {
  return getStoriesIdArray('showstories');
}

export function getJobStoriesIdArray(): Promise<StoriesIds> {
  return getStoriesIdArray('jobstories');
}

export async function getStoryById(
  id: number,
  signal?: AbortSignal,
): Promise<Story> {
  const url = baseUrl + itemPath + id + jsonFormat;
  const responseApi = await fetch(url, { signal })
    .then(handleErrors)
    .then((resp) => resp.json());
  const apiModel = StoryApiModel.check(responseApi);
  return convertToStory(apiModel);
}

export function getStoriesByArrayId(
  ids: StoriesIds,
  signal?: AbortSignal,
): Promise<Story[]> {
  return Promise.all(ids.map((storyId) => getStoryById(storyId, signal)));
}
