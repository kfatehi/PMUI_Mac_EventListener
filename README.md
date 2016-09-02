# apple system listener

Event emitter that, through a pair of subprocesses, reports sleep, wake, shutdown, boot, power settings change, user active, and user idle.

The constructor takes an integer which is how many lines to go back when running `syslog -w [lines-back]` under the hood.

## example

```javascript
var AppleSysListener = require('apple-system-listener');

AppleSysListener(9000).on('event', function(event) {
  console.log(event);
});
```
