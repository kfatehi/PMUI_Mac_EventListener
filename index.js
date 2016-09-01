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

  appleSyslog.spawn({ args: ['-w', 10] }).
    stdout.pipe(appleSyslog.parser()).
    on('data', handleSyslogEvent(emitter));

  return emitter;
}

function handleSyslogEvent(emitter) {
  var state = { };
  return function (syslogEvent) {
    //console.log(data);
    //if ( data.sender === 'shutdown' ) {
    //  console.log(data);
    //}
  }
}
