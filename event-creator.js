module.exports = {
  wentToSleep: function(time) {
    return {
      macEventId: '9',
      timestamp: new Date(time*1000).toLocaleString(),
      name: "COMPUTER_SLEEP"
    }
  },
  wokeFromSleep: function(time) {
    return {
      macEventId: '10',
      timestamp: new Date(time*1000).toLocaleString(),
      name: "COMPUTER_WAKE"
    }
  },
  bootup: function(time) {
    return {
      macEventId: '11',
      timestamp: new Date(time*1000).toLocaleString(),
      name: "COMPUTER_ON"
    }
  },
  shutdown: function(time) {
    return {
      macEventId: '12',
      timestamp: new Date(time*1000).toLocaleString(),
      name: "COMPUTER_SHUTDOWN"
    }
  },
  powerSettingsChange: function() {
    return {
      macEventId: '13',
      timestamp: new Date().toLocaleString(),
      name: "POWER_SETTINGS_CHANGE"
    }
  }
}
