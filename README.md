# Mirage blob fetch demo

This repo has an Ember app with Mirage installed to demo a bug
when using the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API to download an image [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

In summary, when using the `fetch` function overridden by Mirage, downloading an image does not work.
It seems to return a *text* version of the image's bytes. As a result the fetched data is corrupt.
The fetched data is also larger. I believe this is because the text representation of the image's bytes
is UTF-8 encoded, and therefore each of its "characters" varies in width from 1-4 bytes.

There are a few players in the mix:

* [`Mirage`](https://github.com/miragejs/ember-cli-mirage)
* [`Pretender`](https://github.com/pretenderjs/pretender), which Mirage uses to mock the `fetch` function.
* [`whatwg-fetch`](https://github.com/github/fetch), a polyfill for `window.fetch`, which [Pretender uses to
overwrite the browser's native `fetch` function](https://github.com/pretenderjs/pretender/blob/46145a51c6b6900b24517793929c8c2c1fa4ba20/src/index.ts#L64).

* I believe the bug only happens when using Mirage.
* I've confirmed it does *not* happen when only using `whatwg-fetch`.
* I don't *think* it happens when only using Pretender, but I haven't confirmed.

## Installation

* `git clone <repository-url>` this repository
* `cd mirage-blob-fetch`
* `yarn install`

## Running / Development

* `ember serve`
* Visit [http://localhost:4200](http://localhost:4200).

The index route provides a demo that reproduces the problem.

Clicking the buttons will show the returned blob type and byte sizes when using
the native `fetch` function and when using the Mirage-overridden `fetch`.

You can see they are different. Clicking these buttons prompts console logging as well.

<img src="https://github.com/skarger/mirage-blob-fetch/blob/master/public/mirage-blob-fetch.png" title="Index route screenshot" alt="Index route screenshot" />

In order to make this demo, I used an Ember application initializer to capture
the native `fetch` function as `window.nativeFetch`. Otherwise I would have no way to access
native `fetch` because Mirage / Pretender overrides it.

Otherwise, setup consisted of

```
ember new mirage-blob-demo --yarn
cd mirage-blob-demo
ember install ember-cli-mirage

# add the index route, FetchImage component, and passthrough URL for the example image to mirage/config.js
```

