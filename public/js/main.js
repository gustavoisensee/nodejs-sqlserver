
/*
 Main v1.0.0
 Date: 2014-04-07
 (c) 2013 Gustavo Isensee
 License: MIT
*/

var app = angular.module('App', []),

	controller = app.controller('AppController', ['$scope', function($scope) {
  		$scope.list = [];
  		$scope.user = {
			id: 0,
			name: ''  			
  		};

		$scope.listUsers = function (id) {
			$.ajax({
				url: "/findUsers",
				async: false,
				data: {
					id: id
				},
				success: function (data) {
					debugger;
					$scope.list = data;
				}
			});
		};

		$scope.editUser = function (id) {
			$('#myModal').modal('show');
			console.log(id);
		};

		$scope.saveUser = function () {
			$('#myModal').modal('hide');
			console.log('Success');
		};

	}]);

$(document).ready(function () {
	//if necessary
});

