import works from './works';

describe('the works reducer', () => {
  it('initializes works', () => {
    const action = {
      type: 'INITIALIZE_WORKS',
      works: [1, 2, 3],
    };

    expect(works([], action)).toEqual([1, 2, 3]);
  });
});
