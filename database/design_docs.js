const path = require('path');
const fs = require('fs');
const axios = require('axios');

const directoryPath = path.join(__dirname, 'design_docs');

const files = fs.readdirSync(directoryPath);

for (let design_doc of files) {
	const database = design_doc.split('_')[0];
	const doc_name = design_doc.split('_')[1].split('.')[0]; // get rid of .json

	const design_data = fs.readFileSync(path.join(directoryPath, design_doc));
	const design_json = JSON.parse(design_data);

	console.log(design_doc);
	console.log(design_json);

	try {
    	axios.put("http://admin:admin@localhost:5984/" + database + "/_design/" + doc_name, design_json);
	} catch (e) {
		console.log(e);
	}
};
