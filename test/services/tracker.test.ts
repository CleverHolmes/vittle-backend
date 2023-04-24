import app from '../../src/app';

describe('\'tracker\' service', () => {
  it('registered the service', () => {
    const service = app.service('tracker');
    expect(service).toBeTruthy();
  });
});
