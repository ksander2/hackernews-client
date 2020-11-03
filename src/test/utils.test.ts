import { hoursAgoFromDate } from '../utils';

describe('utils', () => {
  it('hoursAgoFromDate test', () => {
    expect(hoursAgoFromDate(1604409815)).toEqual(7);
  });
});
