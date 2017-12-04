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
	    const result = await axios.get('http://' + this.ip + this.endpoint)
	    	.then((response) => {
		    	if (response.status === 200) {
	    			return JSON.parse(parser.toJson(response.data))
	    		}
	    	})
	    return result
	}

	async getPowerState() {
		const data = await this.getMeta();
		return data.item.Power.value
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
	setVolume(volume) {
		axios.get('http://' + this.ip + '/goform/formiPhoneAppVolume.xml?1+' + (volume - 80))
			.then((response) => {
				if (response.status === 200) {
					return response
				}
			})
	}
}

const api = new Endpoints();

api.getVolume();
