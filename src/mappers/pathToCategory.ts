import { CategoryStories } from '../types/common';

export function pathToCategory(path: string): CategoryStories {
  const purePath = path.substr(1, path.length - 1);
  switch (purePath) {
    case 'top':
      return 'top';
    case 'ask':
      return 'ask';
    case 'job':
      return 'job';
    case 'show':
      return 'show';
    default:
      throw new Error('incorrect path');
  }
}
