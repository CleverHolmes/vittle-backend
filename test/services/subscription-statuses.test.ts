import app from '../../src/app';

describe('\'subscription-statuses\' service', () => {
  it('registered the service', () => {
    const service = app.service('subscription-statuses');
    expect(service).toBeTruthy();
  });
});
