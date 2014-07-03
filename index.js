'use strict';

var EventEmitter = require('component-emitter');

var ImageProgress = module.exports = function(url, params) {
    EventEmitter.call(this);

    this.params = params || {};
    this.params.url = url;

    this.autoclear = true;
    this.leading = 2;
    this.loaded = 0;
    this.total = 0;
    this.progress = 0;

    this.request = new XMLHttpRequest();
    this.request.onprogress = this.onProgress.bind(this);
    this.request.onload = this.onLoad.bind(this);
    this.request.onerror = this.onError.bind(this);
};

ImageProgress.prototype = Object.create(EventEmitter.prototype);
ImageProgress.prototype.constructor = ImageProgress;

ImageProgress.prototype.load = function() {
    this.request.open('GET', this.params.url, true);
    this.request.overrideMimeType('text/plain; charset=x-user-defined');
    this.request.send(null);
    this.emit('start', this.params);
};

ImageProgress.prototype.onProgress = function(event) {
    if(!event.lengthComputable) return;

    this.loaded = event.loaded;
    this.total = event.total;
    this.progress = +(this.loaded / this.total).toFixed(this.leading);

    this.emit('progress', {
        loaded: this.loaded,
        total: this.total,
        progress: this.progress
    });
};

ImageProgress.prototype.onLoad = function(event) {
    this.emit('load', this.params);
    if(this.autoclear) this.destroy();
};

ImageProgress.prototype.onError = function(event) {
    this.emit('error', event);
    if(this.autoclear) this.destroy();
};

ImageProgress.prototype.destroy = function(event) {
    this.request.onprogress = null;
    this.request.onload = null;
    this.request.onerror = null;
    this.request = null;
    this.off();
};