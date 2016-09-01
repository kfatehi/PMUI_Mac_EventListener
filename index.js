var EventEmitter = require('events').EventEmitter;
var appleSyslog = require('apple-syslog-stream');
var pmStateChange = require('./power-settings-change');
var ec = require('./event-creator');

// Returns an event emitter
module.exports = function() {
  var emitter = new EventEmitter();

  pmStateChange().on('change', function() {
    emitter.emit('event', ec.powerSettingsChange());
  })

  var proc = appleSyslog.spawn({
    args: ['-w', 10]
  });

  proc.stdout.pipe(appleSyslog.parser()).on('data', function(data) {
    //console.log(data);
    //if ( data.sender === 'shutdown' ) {
    //  console.log(data);
    //}
  });
  return emitter;
}
