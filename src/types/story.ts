export type StoriesIds = number[];

export type StoryType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export type Story = {
  id: number;
  by: string;
  type: StoryType;
  deleted: boolean | undefined;
  time: number;
  text: string | undefined;
  dead: boolean | undefined;
  parent: number | undefined;
  kids: number[] | undefined;
  url: string | undefined;
  score: number;
  title: string;
};
