const axios = require('axios');

class Lucene {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async query(designDoc, index, q) {

		try {
			const lResults = await axios.get(this.baseUrl + "/" + designDoc + "/" + index + "?include_docs=true&q=" + q);

			const docs = lResults.data.rows.map((r) => r.doc);

			return docs;
		} catch(err) {
			console.log(err);

			return [];
		}
	}
}



module.exports = (baseUrl) => new Lucene(baseUrl);