import app from '../../src/app';

describe('\'twilio\' service', () => {
  it('registered the service', () => {
    const service = app.service('twilio');
    expect(service).toBeTruthy();
  });
});
