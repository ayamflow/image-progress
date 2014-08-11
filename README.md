image-progress
=========

A wrapper for loading image via XHR and dispatching progress events.

## How to use

### 1. Install the plugin.
With npm:
```
npm i image-progress --save
```

With Component(1):
```
component install ayamflow/image-progress
```

### 2. Use

```
var Progress = require('image-progress');

var img = new Progress('test-img.png');

img.on('error', function(event) {
    console.log('there has been an error', event);
});

img.on('progress', function(event) {
    console.log('The image is ' + event.progress * 100 + '% loaded !', event.loaded, event.total, event.progress);
});

img.on('complete', function(event) {
    console.log('The image is loaded.');
});

img.on('start', function(event) {
    console.log('The image with URL ' + event.url + ' has started loading');
});

img.load();
```

By default, the `event.progress` only has 2 decimals. You can set the number of decimals by passing the `leading` property as an instanciation option.

## Methods
* ### `new Progress(url, params)`

`url`: the URL for the image you want to load.

`params`: the params hash is used if you need to store & retrieve any property on the `start` & `complete` events. You can also pass different options there (see the options section below).

* ### `load()`

Starts the loading. It will fire a `start` event.

* ### `destroy()`

Removes all internal & external listeners, and clears the XHR object.

By default, this method is called after the `complete` and/or `error` events are triggered. you can disable this behavior by passing the `autoclear: false` as an instanciation option.

## Instanciation options
* ### `onStart`, `onError`, `onProgress`, `onComplete` (default: null)

Callbacks to be called when the appropriate events are fired.

* ### `autoload` (default: false)

Wether the loading should start automatically on instanciation. If you set it to `true`, be sure to also pass `onProgress`/`onComplete` callbacks as well or you won't be able to listen for completion.

* ### `leading` (default: 2)

The number of decimals in the `event.progress` property.

* ### `autoclear` (default: true)

Set wether the `destroy` method should be automatically called after a `complete` or `error` event.

## Events
* `start`: fired when the loading starts. The event contains a reference to the `options` hash, as well as the `url`.
* `progress`: fired each time the XHR request updates. The event has 3 properties: `loaded`, `total` and `progress`.
* `complete'`: fired when the loading is complete. The event contains a reference to the `options` hash, as well as the `url`.
* `error`: fired when a network-related error is raised.

## Properties
* ### `total`: the total bytes to load
* ### `loaded`: the loaded bytes loaded
* ### `progress`: the loading progress, between 0 and 1