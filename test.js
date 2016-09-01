//var MacSysListener = require('./index.js');
//
//var listener = MacSysListener();
//
//listener.on('event', function(event) {
//  console.log(event);
//});

var spawn = require('child_process').spawn;

var bin = __dirname+'/bin/PMUI_Mac_EventListener'
console.log(bin);

var proc = spawn(bin, []);

proc.stdout.on('data', function(data) {
  console.log(data.toString());
});
