import { App } from './app';

describe('App', () => {
  it('should create the app', () => {
    const app = new App();
    expect(app).toBeTruthy();
  });

  it(`should have the 'hicone-web' title`, () => {
    const app = new App();
    expect(app['title']()).toEqual('hicone-web');
  });
});
