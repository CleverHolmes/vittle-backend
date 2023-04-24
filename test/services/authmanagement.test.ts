import app from '../../src/app';

describe('\'authmanagement\' service', () => {
  it('registered the service', () => {
    const service = app.service('authmanagement');
    expect(service).toBeTruthy();
  });
});
