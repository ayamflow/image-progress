var test = require('tape'),
    Progress = require('../index.js');

function mockXMLHttpRequest(){}
// Mock XMLHttpRequest
XMLHttpRequest = mockXMLHttpRequest;
XMLHttpRequest.prototype.open = XMLHttpRequest.prototype.overrideMimeType = XMLHttpRequest.prototype.send = mockXMLHttpRequest;

test('Progress without argument', function (assert) {
    assert.plan(1);

    try {
        var progress = new Progress();
        assert.fail('Progress didn\'t throw an error when called without URL parameter');
    }
    catch(e) {
        assert.pass('Progress should throw an error when called without URL parameter');
    }
});

test('Progress initialization', function (assert) {
    assert.plan(3);

    var progress = new Progress('foo');

    assert.equal(progress.loaded, 0, 'Loaded bytes should be null');
    assert.equal(progress.total, 0, 'Total loaded bytes should be null');
    assert.equal(progress.progress, 0, 'Loading progress should be null');
});

test('Progress with callbacks', function (assert) {
    assert.plan(1);

    var progress = new Progress('http://google.fr', {
        autostart: true,
        onStart: function() {
            assert.pass('onStart callback should be called.');
        }
    });
});