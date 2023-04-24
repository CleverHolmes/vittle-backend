import app from '../../src/app';

describe('\'gift-cards\' service', () => {
  it('registered the service', () => {
    const service = app.service('gift-cards');
    expect(service).toBeTruthy();
  });
});
