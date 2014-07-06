'use strict';

var EventEmitter = require('component-emitter');

var ImageProgress = module.exports = function(url, params) {
    EventEmitter.call(this);

    if(!url) throw new Error('URL should be a valid string');

    this.options = params || {};
    this.options.url = url;

    // this.options.autostart = this.options.autostart || false;
    this.options.autoclear = this.options.autoclear || true;
    this.options.leading = this.options.leading || 2;

    this.loaded = 0;
    this.total = 0;
    this.progress = 0;

    this.request = new XMLHttpRequest();
    this.request.onprogress = this.onProgress.bind(this);
    this.request.onload = this.onLoad.bind(this);
    this.request.onerror = this.onError.bind(this);

    if(this.options.autostart) this.load();
};

ImageProgress.prototype = Object.create(EventEmitter.prototype);
ImageProgress.prototype.constructor = ImageProgress;

ImageProgress.prototype.load = function() {
    this.request.open('GET', this.options.url, true);
    this.request.overrideMimeType('text/plain; charset=x-user-defined');
    this.request.send(null);
    if(this.options.onStart) this.options.onStart(this.options);
    this.emit('start', this.options);
};

ImageProgress.prototype.onProgress = function(event) {
    if(!event.lengthComputable) return;

    this.loaded = event.loaded;
    this.total = event.total;
    this.progress = +(this.loaded / this.total).toFixed(this.options.leading);

    var progressEvent = {
        loaded: this.loaded,
        total: this.total,
        progress: this.progress
    };

    if(this.options.onProgress) this.options.onProgress(progressEvent);
    this.emit('progress', progressEvent);
};

ImageProgress.prototype.onLoad = function(event) {
    if(this.options.onLoad) this.options.onLoad(this.options);
    this.emit('load', this.options);
    if(this.options.autoclear) this.destroy();
};

ImageProgress.prototype.onError = function(event) {
    if(this.options.onError) this.options.onError(this.event);
    this.emit('error', event);
    if(this.options.autoclear) this.destroy();
};

ImageProgress.prototype.destroy = function(event) {
    this.request.onprogress = null;
    this.request.onload = null;
    this.request.onerror = null;
    this.request = null;
    this.off();
};