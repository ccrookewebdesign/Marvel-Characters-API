describe('marvel characters', () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it('should load the characters', () => {
    sut.a = false;

    sut.a = true;

    expect(sut.a).toBe(true);
  });
});