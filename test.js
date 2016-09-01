var MacSysListener = require('./index.js');

var listener = MacSysListener();

listener.on('event', function(event) {
  console.log(event);
});
