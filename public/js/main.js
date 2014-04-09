
/*
 Main v1.0.0
 Date: 2014-04-07
 (c) 2013 Gustavo Isensee
 License: MIT
*/

var app = angular.module('App', []),

	controller = app.controller('AppController', ['$scope', function($scope) {
  		$scope.list = [];

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
		}

	}]);

$(document).ready(function () {
	//if necessary
});

