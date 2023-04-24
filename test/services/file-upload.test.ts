import app from '../../src/app';

describe('\'file-upload\' service', () => {
  it('registered the service', () => {
    const service = app.service('file-upload');
    expect(service).toBeTruthy();
  });
});
