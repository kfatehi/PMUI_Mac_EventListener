var MacSysListener = require('./index.js');

MacSysListener(9000).on('event', function(event) {
  console.log('>>', event);
});
