import app from '../../src/app';

describe('\'mailchimp\' service', () => {
  it('registered the service', () => {
    const service = app.service('mailchimp');
    expect(service).toBeTruthy();
  });
});
