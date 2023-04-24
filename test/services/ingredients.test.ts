import app from '../../src/app';

describe('\'ingredients\' service', () => {
  it('registered the service', () => {
    const service = app.service('ingredients');
    expect(service).toBeTruthy();
  });
});
