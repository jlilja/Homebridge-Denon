const denonClient = require('./lib/app.js')
var Service, Characteristic

module.exports = function(homebridge) {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  homebridge.registerAccessory("homebridge-denon-connect", "denon-connect", denon)
}

function denon (log, config) {
  this.log = log
  this.config = config
  this.name = config["name"]
  this.ip = config["ip"]
  this.state = 0
  this.denonClient = new denonClient(this.ip)
}

denon.prototype.getPowerState = async function(callback) {
  const res = await this.denonClient.getPowerState()
  this.state = ((res == 'ON') ? true : false)

  this.log("Power on: %s", this.state)
  callback(null, this.state)
}

denon.prototype.setPowerState = function(state, callback) {
  newState = ((state == true) ? "ON" : "OFF")
  this.denonClient.setPowerState(newState).then(res => {

    newState = this.getPowerState.bind(this)
    newState = ((newState == true) ? "ON" : "OFF")
    this.state = newState

    this.log("Power on: %s", this.state)
    callback(null)
  })
}

denon.prototype.getServices = function() {
  this.service = new Service.Switch(this.name)

  this.service.getCharacteristic(Characteristic.On)
    .on('get', this.getPowerState.bind(this))
    .on('set', this.setPowerState.bind(this))

  return [this.service]
}
