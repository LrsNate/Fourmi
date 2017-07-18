import works from './works';

describe('The works reducer', () => {
  it('initializes works', () => {
    const action = {
      type: 'INITIALIZE_WORKS',
      works: [1, 2, 3],
    };

    expect(works([], action)).toEqual([1, 2, 3]);
  });

  it('ignores unknown actions', () => {
    const action = { type: 'FOO' };

    expect(works([], action)).toEqual([]);
  });
});
