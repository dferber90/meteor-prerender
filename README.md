 > ⚠️ **This package is unmaintained!**
 > 
 > *The Meteor Development Group has taken over maintaining this package. Use [`mdg:seo`](https://atmospherejs.com/mdg/seo) instead.*
 >
 > *The issues of this repository are closed! Please file new issues at its new home in [`meteor/galaxy-seo-package`](https://github.com/meteor/galaxy-seo-package/)*.

# Prerender

SEO for Meteor Apps.
A Meteor wrapper for [https://prerender.io/][prerender-io].

[![Build Status](https://travis-ci.org/dferber90/meteor-prerender.svg)](https://travis-ci.org/dferber90/meteor-prerender)

## Intention
This package is a reference on how to enable Prerender in pre-1.3 Meteor applications. If you need anything more sophisticated, create an inlined package in your project. It's just a few lines of code.

## Usage with Meteor 1.3
Meteor 1.3 supports inclusion of npm modules out of the box.
If you use Meteor 1.3, use the `prerender-node` npm module directly.
You don't need this package at all in this case.

---

## Setup

Install with

```
$ meteor add dferber:prerender
```

In your settings.json file include:

`settings.json`

```
{
  "PrerenderIO": {
    "serviceUrl": "http://localhost:3033/",
    "token": "yourtoken"
  }
}
```

The `serviceURL` is optional and only used to test the Prerender server locally.
Leave it out in your production configuration.

*NOTICE*: You may also provide the above credentials using environment variables, namely `PRERENDERIO_TOKEN` and `PRERENDERIO_SERVICE_URL`. They precede the configuration from the settings file.

## Testing and Verifying
There are two options to test whether Prerender is working or not.

### Locally (recommended)

1. Set the `serviceUrl` to `http://localhost:3033/`.
2. Download the [open source Prerender server](https://prerender.io/documentation/test-it) to another directory
3. Run the Prerender server with a custom port locally (because 3000 is taken by your Meteor app), with `$ export PORT=3033; node server.js`
4. Visit any URL of your application and append `?_escaped_fragment_=`, e.g. [http://localhost:3000/?_escaped_fragment_=](http://localhost:3000/?_escaped_fragment_=)

This will show you the version Prerender generated and search engines will see.
You can view logs in the running prerender server which is quite helpful.


### Using the Prerender service

1. Set the `serviceUrl` to `http://service.prerender.io/`.
2. Visit any URL of your application and append `?_escaped_fragment_=`, e.g. [http://localhost:3000/?_escaped_fragment_=](http://localhost:3000/?_escaped_fragment_=)
3. See what is reported to Prerender at [https://prerender.io/][prerender-io],

For more options, take a look at the [prerender-node package][prerender-node].


## Delaying the rendering

Sometimes the content will not show up immediately and all Prerender sees are loading spinners.
This happens because Prerender uses the HTML too early, while the subscriptions are still loading.

Set `window.prerenderReady = false;` in the client side code. This will tell Prerender to wait.
When your content is loaded, set it to `true` and Prerender will use that version.
It's also possible to never set it to `true`.
The request will then time out after about 20 seconds and Prerender will use whatever is on the screen.

## Possible Errors

```
Error: connect ECONNREFUSED
    at errnoException (net.js:905:11)
    at Object.afterConnect [as oncomplete] (net.js:896:19)
```
If you get this error, you probably forgot to run your local Prerender server.

## Prior Art
The [initial version](https://github.com/dfischer/meteor-prerenderio) by [@dfischer][dfischer] uses the outdated [prerender-node module][prerender-node]. This package uses the latest version, allowing it to work without all the boilerplate.

This package further uses Meteors extension of Semantic Versioning, which keeps the released version consistent with that of the prerender-node npm module.

As the configuration can be reused switching from the previous package to this one is as easy as

```
$ meteor remove dfischer:prerenderio
$ meteor add dferber:prerender
```

## Contributions

Thanks to [@electricjesus](https://github.com/electricjesus) and [@dfischer][dfischer] for the [initial version](https://github.com/dfischer/meteor-prerenderio).
Thanks to [@arunoda](https://github.com/arunoda) for simplifying [prerender-node][prerender-node].

[prerender-node]: https://github.com/prerender/prerender-node
[prerender-io]: https://prerender.io/
[dfischer]: https://github.com/dfischer
