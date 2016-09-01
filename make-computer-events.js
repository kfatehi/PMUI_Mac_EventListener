var through = require('through');
var ec = require('./event-creator');

module.exports = function () {
  return through(function(data) {
    if ( data.Sender === 'CommCenter' ) {
      if ( data.Message === "Telling CSI to exit low power." ) {
        return this.queue(ec.wokeFromSleep(data.Time))
      }

      if ( data.Message === "Telling CSI to go low power." ) {
        return this.queue(ec.wentToSleep(data.Time))
      }
    }

    if ( data.Sender === 'bootlog' ) {
      var match = data.Message.match(/BOOT_TIME\s(\d+)/);
      if ( match ) {
        var time = match[1];
        return this.queue(ec.bootup(parseInt(time)));
      }
    }

    if ( data.Sender === 'shutdown' ) {
      var match = data.Message.match(/SHUTDOWN_TIME:\s(\d+)/);
      if ( match ) {
        var time = match[1];
        return this.queue(ec.shutdown(parseInt(time)));
      }
    }
  })
}
