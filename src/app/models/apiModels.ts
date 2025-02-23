import {
  Boolean as $Boolean,
  String as $String,
  Number as $Number,
  Array as $Array,
  Static as $Static,
  Object as RObject,
  Union,
  Literal,
} from 'runtypes';

import { StoriesIds, Story } from '../types/story';

const StoryType = Union(
  Literal('job'),
  Literal('story'),
  Literal('comment'),
  Literal('poll'),
  Literal('pollopt'),
);

export const StoriesIdsApiModel = $Array($Number);
export type StoriesIdsApiModel = $Static<typeof StoriesIdsApiModel>;

export const StoryApiModel = RObject({
  id: $Number,
  by: $String.optional(),
  type: StoryType,
  deleted: $Boolean.optional(),
  time: $Number,
  text: $String.optional(),
  dead: $Boolean.optional(),
  parent: $Number.optional(),
  kids: $Array($Number).optional(),
  url: $String.optional(),
  score: $Number.optional(),
  title: $String.optional(),
  descendants: $Number.optional(),
});

export type StoryApiModel = $Static<typeof StoryApiModel>;

export function convertToStoriesIds(apiModel: StoriesIdsApiModel): StoriesIds {
  return apiModel.map((item) => item);
}

export function convertToStory({
  id,
  by: apiBy,
  dead,
  deleted,
  kids,
  parent,
  score,
  text,
  time,
  title: apiTitle,
  type,
  url,
  descendants,
}: StoryApiModel): Story {
  return {
    id,
    by: apiBy ?? 'anonym',
    dead,
    deleted,
    kids,
    parent,
    score,
    text,
    time,
    title: apiTitle ?? '',
    type,
    url,
    descendants,
  };
}
