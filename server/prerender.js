/* eslint-meteor-env server */

var prerenderio = Npm.require('prerender-node');

(function() {
  // token
  var prerenderToken = Meteor.settings.PrerenderIO && Meteor.settings.PrerenderIO.token;
  prerenderToken = prerenderToken || process.env.PRERENDERIO_TOKEN; // Fallback to environment variable
  if (prerenderToken) prerenderio.set('prerenderToken', prerenderToken);

  // service url
  var prerenderServiceUrl = Meteor.settings.PrerenderIO && Meteor.settings.PrerenderIO.prerenderServiceUrl;
  prerenderServiceUrl = prerenderServiceUrl || process.env.PRERENDERIO_SERVICE_URL; // Fallback to environment variable
  if (prerenderServiceUrl) prerenderio.set('prerenderServiceUrl', prerenderServiceUrl);

  console.log("Setting up Prerender.io at " + prerenderServiceUrl  + " with token " + prerenderToken);
})();

prerenderio.set('afterRender', function afterRender(error) {
  if (error) {
    console.log('prerenderio error', error); // eslint-disable-line no-console
    return;
  }
});

WebApp.rawConnectHandlers.use(prerenderio);
