var prerenderio = Npm.require('prerender-node');
var token;
var serviceUrl;
var prerenderSettings = Meteor.settings.PrerenderIO;

if (typeof prerenderSettings === 'object') {
  token = prerenderSettings.token;

  // support `prerenderServiceUrl` (for historical reasons) and `serviceUrl`
  serviceUrl = prerenderSettings.prerenderServiceUrl || prerenderSettings.serviceUrl;
}

if (token) {
  if (serviceUrl) prerenderio.set('prerenderServiceUrl', serviceUrl);
  prerenderio.set('prerenderToken', token);

  prerenderio.set('afterRender', function afterRender(error) {
    if (error) {
      console.log('prerenderio error', error); // eslint-disable-line no-console
      return;
    }
  });

  WebApp.rawConnectHandlers.use(prerenderio);
}
