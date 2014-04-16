
/*
 Main v1.0.1
 Date: 2014-04-16
 (c) 2013 Gustavo Isensee
 License: MIT
*/

var config = {
	userName: 'nodejs',
	password: 'nodejs123',
	server: 'localhost',
	options: {
		instanceName: null,
		database: 'nodejs-sqlserver'
	}
},
	Connection = require('tedious').Connection,
	Request = require('tedious').Request,
	TYPES = require('tedious').TYPES;
	moment = require('moment');

exports.users = function(req, res){
  res.render('users');
};

//find all the users of database
exports.findUsers = function (req, res) {
	//console.log(req.query); - get parameters
	var list = [],
		connection = new Connection(config);

	connection.on('connect', connected);
	connection.on('end', end);

	function connected (err){
		// If no error, then good to go...
		if (err) {
			console.log('Error connecting to the database: ' + err)	
		} else {
			executeFindUsers();
		}
	};

	function end() {
	  console.log('Connection closed');
	  res.send(list);
	};

	function executeFindUsers() {
		var Request = require('tedious').Request;

		request = new Request("select id, name, datebirth from [user]", function(err, rowCount) {
		  if (err) {
		    console.log('Request error: ' + err);
		  }
		  connection.close();
		});

		request.on('row', function(columns) {
			list.push({id: 0, name: ''});
			columns.forEach(function(column) {
				list[list.length-1][column.metadata.colName] = column.value;

			});
		});
		connection.execSql(request);
	}
};

//find user by id of database
exports.findUserById = function (req, res) {
	//console.log(req.query); - get parameters
	var user = {},
		connection = new Connection(config);

	connection.on('connect', connected);
	connection.on('end', end);

	function connected (err){
		// If no error, then good to go...
		if (err) {
			console.log('Error connecting to the database: ' + err)	
		} else {
			executeFindUserById(req.query.id);
		}
	};

	function end() {
		console.log('Connection closed');
		res.send(user);
	};

	function executeFindUserById(id) {
		request = new Request("select id, name, datebirth from [user] where id = @idT", function(err, rowCount) {
			if (err) {
				console.log('erro no request' + err);
			}
			connection.close();
		});
		request.addParameter('idT', TYPES.Int, parseInt(id));

		request.on('row', function(columns) {
			user.id = columns[0].value;
			user.name = columns[1].value;
			user.datebirth = columns[2].value;
		});
		connection.execSql(request);
	}
};

//save user in database
exports.saveUser = function (req, res) {
	//console.log(req.query); - get parameters
	var user = req.query.user,
		connection = new Connection(config);

	connection.on('connect', connected);
	connection.on('end', end);

	function connected (err){
		// If no error, then good to go...
		if (err) {
			console.log('Error connecting to the database: ' + err)	
		} else {
			executeSaveUser(req.query.user);
		}
	};

	function end() {
		console.log('Connection closed');
		res.send(true);
	};

	function executeSaveUser(user) {
		user.datebirth = moment(user.datebirth, "DD/MM/YYYY")._d;
		var query = 'update [user] set name = @name, datebirth = @datebirth where id = @id';
		if (user.id == 0) {
			query = 'insert into [user] (name, datebirth) values (@name, @datebirth)';
		};
		request = new Request(query, function(err, rowCount) {
			if (err) {
				console.log('erro no request' + err);
			}
			connection.close();
		});
		request.addParameter('name', TYPES.VarChar, user.name);
		request.addParameter('datebirth', TYPES.DateTime, new Date(user.datebirth));

		if (user.id > 0) {
			request.addParameter('id', TYPES.Int, parseInt(user.id));
		};
		connection.execSql(request);
	}
};

//remove user of database
exports.removeUser = function (req, res) {
	//console.log(req.query); - get parameters
	var connection = new Connection(config);

	connection.on('connect', connected);
	connection.on('end', end);

	function connected (err){
		// If no error, then good to go...
		if (err) {
			console.log('Error connecting to the database: ' + err)	
		} else {
			executeRemoveUser(req.query.id);
		}
	};

	function end() {
		console.log('Connection closed');
		res.send(true);
	};

	function executeRemoveUser(id) {
		var query = 'delete from [user] where id = @id';
		request = new Request(query, function(err, rowCount) {
			if (err) {
				console.log('erro no request' + err);
			}
			connection.close();
		});
		request.addParameter('id', TYPES.Int, parseInt(id));
		connection.execSql(request);
	}
};