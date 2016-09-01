var EventEmitter = require('events').EventEmitter;
var appleSyslog = require('apple-syslog-stream');
var pmStateChange = require('./power-settings-change');
var ec = require('./event-creator');
var spawn = require('child_process').spawn;
var JSONStream = require('JSONStream');
var makeComputerEvents = require('./make-computer-events');

module.exports = function(linesBack) {
  var emitter = new EventEmitter();

  var psc = pmStateChange({ parse: true });
  psc.emitter.on('change', function(settings) {
    emitter.emit('event', ec.powerSettingsChange(settings));
  })

  var pme = spawn(__dirname+'/bin/PMUI_Mac_EventListener');
  pme.stdout.pipe(JSONStream.parse('event')).
    on('data', ev => emitter.emit('event', ev));

  var asl = appleSyslog.spawn({ args: ['-w', linesBack || 10] });
  asl.stdout.pipe(appleSyslog.parser()).
    pipe(makeComputerEvents()).
    on('data', ev => emitter.emit('event', ev));

  function cleanup() {
    pme.kill();
    asl.kill();
    psc.watcher.unwatch();
  }

  process.on('uncaughtException', function(err) {
    cleanup();
    process.stdout.write('\n'+err.stack+'\n');
    process.exit(1);
  });

  process.on('exit', function() {
    cleanup();
    process.exit(0);
  });

  process.on('SIGINT', function() {
    cleanup();
    process.exit(0);
  });

  return emitter;
}
