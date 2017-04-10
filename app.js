var request = require('request');
var parser = require('xml2json');

class Endpoints {

	/**
	 * Set ip and set default endpoint
	 * 
	 * @return void
	 */
	constructor() {
		this.ip = '000.000.0.000';
		this.endpoint = '/goform/formMainZone_MainZoneXml.xml';
	}

	/**
	 * Set volume of receiver. 
	 * 
	 * Word of caution. The receiver boosts the volume by 80 points. Be sure to keep the (- 80) value in the method.
	 * Otherwise you will get a massive shock and you will probably die.
	 * 
	 * @author Jonas Lilja
	 * 
	 * @param Number
	 */
	setVolume(volume) {
		request.get('http://' + this.ip + '/goform/formiPhoneAppVolume.xml?1+' + (volume - 80), function (error, response) {
			if (response.statusCode === 200) {
				console.log('Volume is set to ' + volume);
			}
		})
	}

	/**
	 * @author Jonas Lilja
	 * 
	 * @return object
	 */
	getMeta() {
	    request.get('http://' + this.ip + this.endpoint, function (error, response, body) {
	    	if (response.statusCode === 200) {
    			return parser.toJson(body);
    		}
	    })
	}

	getPowerState() {
		// 1. Manage to get data from getMeta method.
		// 2. convert it to Json
		// 3. Filter out specific data
		// 4. Return data.
	}

}

var endPoint = new Endpoints();

endPoint.methodName();