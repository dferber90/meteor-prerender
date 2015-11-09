/* global
  Package: false
  Npm: false
*/

Package.describe({
  name: 'dfischer:prerenderio',
  summary: 'Node wrapper for prerenderio',
  version: '2.1.0_1',
  git: 'https://github.com/dfischer/meteor-prerenderio',
});

Npm.depends({
  'prerender-node': '2.1.0',
});


Package.onUse(function packageConfiguration(api) {
  api.use('ecmascript');
  api.use(['templating'], 'client');
  api.use(['webapp'], 'server');
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('dfischer:prerenderio.js', 'server');
  api.addFiles('dfischer:prerender.html', 'client');
});
