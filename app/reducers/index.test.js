import reducer from './index';

describe('The main reducer', () => {
  it('initializes a defined value', () => {
    expect(reducer(undefined, {})).toBeDefined();
  });
});
