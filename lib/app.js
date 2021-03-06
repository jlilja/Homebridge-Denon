const axios = require('axios')
const readXML = require('xml2json')

module.exports = class Endpoints {

  /**
   * Set ip and set default endpoint
   * 
   * @return void
   */
  constructor (ip) {
    this.ip = ip;
  }

  /**
   * Retrieves data from the entire state.
   * @author Jonas Lilja
   * @return object
   */
  async getMeta () {
    return await axios.get(`http://${this.ip}/goform/formMainZone_MainZoneXml.xml`)
  }

  async getPowerState () {
    const res = await this.getMeta()

    return JSON.parse(readXML.toJson(res.data)).item.Power.value
  }

  async setPowerState (state) {
    return await axios.get(`http://${this.ip}/MainZone/index.put.asp?cmd0=PutZone_OnOff/${state}`)
  }

  async getVolume () {
    const { item: { MasterVolume }} = await this.getMeta();
    return MasterVolume
  }

  /**
   * Set volume of receiver. 
   * 
   * Word of caution. The receiver boosts the volume by 80 points. Be sure to keep the (- 80) value in the method.
   * Otherwise you will get a massive shock and you will probably die.
   * 
   * @author Jonas Lilja
   * @param { integer } [volume] volume points
   * @return { object } [http] client response
   */
  async setVolume (volume) {
    return await axios.get(`http://${this.ip}/goform/formiPhoneAppVolume.xml?1+${volume - 80}`)
  }
}
