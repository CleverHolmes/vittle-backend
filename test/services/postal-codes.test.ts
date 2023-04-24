import app from '../../src/app';

describe('\'postal-codes\' service', () => {
  it('registered the service', () => {
    const service = app.service('postal-codes');
    expect(service).toBeTruthy();
  });
});
