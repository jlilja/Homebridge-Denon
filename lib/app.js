var axios = require('axios');
var parser = require('xml2json');

class Endpoints {

	/**
	 * Set ip and set default endpoint
	 * 
	 * @return void
	 */
	constructor() {
		this.ip = '192.168.1.4';
		this.endpoint = '/goform/formMainZone_MainZoneXml.xml';
	}

	/**
	 * @author Jonas Lilja
	 * @return object
	 */
	async getMeta() {
	    return await axios.get('http://' + this.ip + this.endpoint)
	}

	async getPowerState() {
		const data = await this.getMeta();
    console.log(data.request.connection)
		return data.request.connection.readable
	}

  async setPowerState(state) {
    return await axios.get(`http://${this.ip}/MainZone/index.put.asp?cmd0=PutZone_OnOff/${state}`)
  }

	async getVolume() {
		const data = await this.getMeta();
		return data.item.MasterVolume.value
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
	async setVolume(volume) {
		return await axios.get(`http://${this.ip}/goform/formiPhoneAppVolume.xml?1+` + volume - 80)
	}
}

const api = new Endpoints()

// api.setPowerState('OFF')
// api.getPowerState()
