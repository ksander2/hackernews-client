import {
  Boolean as $Boolean,
  String as $String,
  Number as $Number,
  Array as $Array,
  Static as $Static,
  Record,
  Union,
  Literal,
  Undefined,
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

export const StoryApiModel = Record({
  id: $Number,
  by: $String,
  type: StoryType,
  deleted: $Boolean.Or(Undefined),
  time: $Number,
  text: $String.Or(Undefined),
  dead: $Boolean.Or(Undefined),
  parent: $Number.Or(Undefined),
  kids: $Array($Number).Or(Undefined),
  url: $String.Or(Undefined),
  score: $Number.Or(Undefined),
  title: $String.Or(Undefined),
  descendants: $Number.Or(Undefined),
});

export type StoryApiModel = $Static<typeof StoryApiModel>;

export function convertToStoriesIds(apiModel: StoriesIdsApiModel): StoriesIds {
  return apiModel.map((item) => item);
}

export function convertToStory({
  id,
  by,
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
    by,
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
