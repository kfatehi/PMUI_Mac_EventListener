var plist = require('plist');
var debounce = require('debounce');
var chokidar = require('chokidar');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var pmStateFile = '/Library/Preferences/SystemConfiguration/com.apple.PowerManagement.plist';

/** Usage
 * var watch = require('./power-settings-change');
 * watch({ parse: true }).on('change', function(state) {
 *   console.log(state);
 * })
 */
module.exports = function(_opts) {
  var opts = _opts || {};
  var emitter = new EventEmitter();
  var watcher = chokidar.watch(pmStateFile, { persistent: true });

  // we might get too many hits at once,
  // so we debounce so as to get the last one
  var changeHandler = debounce(function(path) {
    fs.readFile(path, function(err, buf) {
      if (err) throw err;
      var data = null;
      if (opts.parse) {
        data = plist.parse(buf.toString());
      }
      emitter.emit('change', data);
    });
  }, 100);

  watcher.on('change', changeHandler);

  return emitter;
}
