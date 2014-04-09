
//find all the users of database
exports.findUsers = function (req, res) {
	//console.log(req.query); - get parameters
	var list = [];

	var Connection = require('tedious').Connection;
	var config = {
		userName: 'nodejs',
		password: 'nodejs123',
		server: 'localhost',
		options: {
			instanceName: null,
			database: 'nodejs-sqlserver'
		}
	};

	var connection = new Connection(config);
	connection.on('connect', connected);
	connection.on('end', end);

	function connected (err){
		// If no error, then good to go...
		if (err) {
			console.log('Erro ao conectar no banco de dados: ' + err)	
		} else {
			executeStatement();
		}
	};

	function end() {
	  console.log('Connection closed');
	  res.send(list);
	};

	function executeStatement() {
		var Request = require('tedious').Request,
			pRow = '';

		request = new Request("select id, nome, datanascimento from usuario", function(err, rowCount) {
		  if (err) {
		    console.log('erro no request' + err);
		  } else {
		    console.log(rowCount + ' rows');
		  }
		  connection.close();
		});

		request.on('row', function(columns) {
			list.push({id: 0, nome: ''});
			columns.forEach(function(column) {
				//console.log(column);
				list[list.length-1][column.metadata.colName] = column.value;

			});
		});
		connection.execSql(request);
	}
};