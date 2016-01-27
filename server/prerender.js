var prerenderio = Npm.require('prerender-node');
var prerenderToken;
var prerenderServiceUrl;
var prerenderSettings = Meteor.settings.PrerenderIO;

// token
prerenderToken = prerenderSettings && prerenderSettings.token;
prerenderToken = process.env.PRERENDERIO_TOKEN || prerenderToken;

// service url (support `prerenderServiceUrl` (for historical reasons) and `serviceUrl`)
prerenderServiceUrl = prerenderSettings &&
  (prerenderSettings.prerenderServiceUrl || prerenderSettings.serviceUrl);
prerenderServiceUrl = process.env.PRERENDERIO_SERVICE_URL || prerenderServiceUrl;

if (prerenderToken) {
  if (prerenderServiceUrl) prerenderio.set('prerenderServiceUrl', prerenderServiceUrl);
  prerenderio.set('prerenderToken', prerenderToken);

  prerenderio.set('afterRender', function afterRender(error) {
    if (error) {
      console.log('prerenderio error', error); // eslint-disable-line no-console
      return;
    }
  });

  WebApp.rawConnectHandlers.use(prerenderio);
}
