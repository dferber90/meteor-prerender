/* eslint-meteor-env server */

var prerenderio = Npm.require('prerender-node');
var prerenderToken;
var prerenderServiceUrl;

// token
prerenderToken =
  Meteor.settings.PrerenderIO &&
  Meteor.settings.PrerenderIO.token;
prerenderToken = prerenderToken || process.env.PRERENDERIO_TOKEN;
if (prerenderToken) prerenderio.set('prerenderToken', prerenderToken);

// service url
prerenderServiceUrl =
  Meteor.settings.PrerenderIO &&
  Meteor.settings.PrerenderIO.prerenderServiceUrl;
prerenderServiceUrl = prerenderServiceUrl || process.env.PRERENDERIO_SERVICE_URL;
if (prerenderServiceUrl) prerenderio.set('prerenderServiceUrl', prerenderServiceUrl);

prerenderio.set('afterRender', function afterRender(error) {
  if (error) {
    console.log('prerenderio error', error); // eslint-disable-line no-console
    return;
  }
});

WebApp.rawConnectHandlers.use(prerenderio);
