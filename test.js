var MacSysListener = require('./index.js');

MacSysListener(9000).on('event', function(event) {
  process.stdout.write(JSON.stringify(event)+'\n');
});
