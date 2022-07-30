var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var request = require('request');
//var port = process.env.PORT || 80

var express = require('express');
var app = express();
var path = require('/example-smart-app');

// viewed at http://localhost:8080
//res.sendFile(path.join(__dirname + '/index.html'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
	console.log('Server started. Listening on port',port);
});


var DESTINATION_VERIFICATION_TOKEN = '8345';

//pulled from Source Settings page
var SOURCE_API_KEY = '33626994-0804-43df-a20d-66cc3ef8e3f5';
var SOURCE_SECRET = 'PT0JIn1Jncux23IEEeEd3mLLwuJPbcZNzYkYbc11CDgCvk82AI2Ybh9vMm9IjO86rCoggBVG';
var authToken, authTokenExpires;

const mongodb = require('mongodb');
var mongoose = require('mongoose');  

app.use(bodyParser.json());

// POST Verification Destination Token 
app.post('/destination', function (req, res) {
	
	if (req.body['verification-token'] === DESTINATION_VERIFICATION_TOKEN) {
		console.log(req.body);
		console.log(req.headers);
		console.log('verification-token body matched!');
		return res.send(req.body.challenge);
	//} else if (req.headers['verification-token'] === DESTINATION_VERIFICATION_TOKEN) {
		//console.log(req.headers);
		//console.log('verification-token headers matched!');
		//return res.send(req.headers.challenge);
	}
	else {
	//console.log(req.body);
	//console.log(req.headers);
    //console.log(req.query.challenge);
	console.log('verfication-token did not match :( ');
	res.sendStatus(400);}
});

//New Appts, Writes to Mongodb using Mongoose
app.post('/destination/newpatient', function (req, res) {
	if (req.body.Meta.DataModel === 'PatientAdmin' && req.body.Meta.EventType === 'NewPatient') {
		console.log('New patient message received!');

	  
	//mongodb connection information
	//let uri = "mongodb://heron8345:"
	mongoose.connect(uri);
	let db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback() 
	{
          
		  // Create Appointment Collection Schema
		  let patientSchema = mongoose.Schema({
			PatientFirstName: String,
			PatientLastName: String,
			PatientIdentifiers:{ type : Array , "default" : [] },
			PCPNPI: String	
		  });
			
		  //Appointment Collection/Table
			try {
			  Patients = mongoose.model('patient')
			} catch (error) {
			  Patients = mongoose.model('patient', patientSchema)
			}
		 			
			// Store Message Appointment Collection details
		  var patients ={
			PatientFirstName: req.body.Patient.Demographics.FirstName,
			PatientLastName: req.body.Patient.Demographics.LastName,
			PatientIdentifiers: req.body.Patient.Identifiers,
			PCPNPI: req.body.Patient.PCP.NPI
			
		  };
	 
		//db write
		  let list = [patients]
		  Patients.insertMany(list).then(() => {
			  
			// Only close the connection when your app is terminating
			return mongoose.connection.close()
		  }).catch(err => {
			// Log any errors that are thrown in the Promise chain
			console.log(err)
			})
			//getClinicalSummary(appts);
		});
	
	
}

	res.sendStatus(200);
});



//New Appts, Writes to Mongodb using Mongoose
app.post('/destination/appt', function (req, res) {
	if (req.body.Meta.DataModel === 'Scheduling' && req.body.Meta.EventType === 'New') {
		console.log('Scheduling message received!');

		var appointment = {
			PatientFirstName: req.body.Patient.Demographics.FirstName,
			PatientLastName: req.body.Patient.Demographics.LastName,
			PatientIdentifiers: req.body.Patient.Identifiers,
			VisitDateTime: req.body.Visit.VisitDateTime,
			VisitReason: req.body.Visit.Reason,
			ProviderFirstName: req.body.Visit.AttendingProvider.FirstName,
			ProviderLastName: req.body.Visit.AttendingProvider.LastName,
			ProviderID: req.body.Visit.AttendingProvider.ID
		};
  
	//mongodb connection information
	let uri = "mongodb://heron8345:2%40wJK7qASVbGwgt@ds031862.mlab.com:31862/heroku_cm016ptg"
	mongoose.connect(uri);
	let db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback() 
	{
          
		  // Create Appointment Collection Schema
		  let apptSchema = mongoose.Schema({
			PatientFirstName: String,
			PatientLastName: String,
			PatientIdentifiers:{ type : Array , "default" : [] },
			VisitDateTime: String,
			VisitReason: String,
			ProviderFirstName: String,
			ProviderLastName: String,
			ProviderID: String
		  });
			
		  //Appointment Collection/Table
			try {
			  Appts = mongoose.model('appointments')
			} catch (error) {
			  Appts = mongoose.model('appointments', apptSchema)
			}
		 			
			// Store Message Appointment Collection details
		  var appts ={
			PatientFirstName: req.body.Patient.Demographics.FirstName,
			PatientLastName: req.body.Patient.Demographics.LastName,
			PatientIdentifiers: req.body.Patient.Identifiers,
			VisitDateTime: req.body.Visit.VisitDateTime,
			VisitReason: req.body.Visit.Reason,
			ProviderFirstName: req.body.Visit.AttendingProvider.FirstName,
			ProviderLastName: req.body.Visit.AttendingProvider.LastName,
			ProviderID: req.body.Visit.AttendingProvider.ID
		  };
	 
		//db write
		  let list = [appts]
		  Appts.insertMany(list).then(() => {
			  
			// Only close the connection when your app is terminating
			return mongoose.connection.close()
		  }).catch(err => {
			// Log any errors that are thrown in the Promise chain
			console.log(err)
			})
			getClinicalSummary(appts);
		});
	
	
}

	res.sendStatus(200);
});

app.get('/appointments', function (req, res) {
	var appointments = db.get('appointments').value();
	res.send(appointments);
});


function getAuthToken(callback) {
	if (authToken && Date.now() < new Date(authTokenExpires).getTime()) {
		return callback(authToken);
	} else {
		//get new token

		var options = {
			url: 'https://api.redoxengine.com/auth/authenticate',
			method: 'POST',
			body: {
				apiKey: SOURCE_API_KEY,
				secret: SOURCE_SECRET
			}, 
			headers: {
				'Content-Type': 'application/json'
			},
			json: true
		};

		request.post(options, function (err, response, body) {
			console.log(body);

			authToken = body.accessToken;
			authTokenExpires = body.expires;

			callback(authToken);
		});
	}
}

function getClinicalSummary(appointment) {
	getAuthToken(function (token) {
		var options = {
			url: 'https://api.redoxengine.com/query',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			json: true
		};

		options.body = {
			"Meta": {
				"DataModel": "Clinical Summary",
				"EventType": "PatientQuery",
				"EventDateTime": "2017-07-26T04:46:01.868Z",
				"Test": true,
				"Destinations": [
					{
						"ID": "ef9e7448-7f65-4432-aa96-059647e9b357",
						"Name": "Patient Query Endpoint"
					}
				]
			},
			"Patient": {
				"Identifiers": appointment.PatientIdentifiers
			}
		};

		request.post(options, function (err, response, body) {
			console.log('ClinicalSummary:');
			console.log(err);
			console.log(response.statusCode);
			console.log(body.Meta.DataModel + " was received");

			sendMedia(appointment);
		})
	});
}


function sendMedia(appointment) {
	getAuthToken(function (token) {
		var options = {
			url: 'https://api.redoxengine.com/endpoint',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			json: true
		};

		options.body = {
			"Meta": {
				"DataModel": "Media",
				"EventType": "New",
				"EventDateTime": "2017-07-26T04:51:21.918Z",
				"Test": true,
				"Destinations": [
					{
						"ID": "af394f14-b34a-464f-8d24-895f370af4c9",
						"Name": "Redox EMR"
					}
				],
				"FacilityCode": null
			},
			"Patient": {
				"Identifiers": appointment.PatientIdentifiers
			},
			"Media": {
				"FileType": "JPG",
				"FileName": "SampleImage",
				"FileContents": "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",
				"DocumentType": "Sample Image",
				"DocumentID": "b169923c-42g9-4fe3-91hg-8ckf1094e90l",
				"CreationDateTime": "2017-06-22T19:30:04.387Z",
				"ServiceDateTime": "2017-06-22T17:00:00.387Z",
				"Provider": {
					"ID": appointment.ProviderID
				},
				"Authenticated": "False",
				"Availability": "Available"
			}
		};

		request.post(options, function (err, response, body) {
			console.log('Media:');
			console.log(err);
			console.log(response.statusCode);
			console.log(body);
		});
	})
}


















