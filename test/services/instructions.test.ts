import app from '../../src/app';

describe('\'instructions\' service', () => {
  it('registered the service', () => {
    const service = app.service('instructions');
    expect(service).toBeTruthy();
  });
});
