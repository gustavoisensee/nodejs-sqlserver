
/*
 Main v1.0.1
 Date: 2014-04-16
 (c) 2013 Gustavo Isensee
 License: MIT
*/

var app = angular.module('App', []),

	controller = app.controller('AppController', ['$scope', '$filter', function($scope, $filter) {
		$scope.search = '';
  		$scope.list = [];
  		$scope.user = {
			id: 0,
			name: '',
			datebirth: ''
  		};

		$scope.listUsers = function () {
			$.ajax({
				type: 'GET',
				url: "/user",
				async: false,
				success: function (data) {
					$scope.list = data;
				}
			});
		};

		$scope.cleanUser = function () {
			$scope.user = {
				id: 0,
				name: '',
				datebirth: ''
	  		};
		};

		$scope.editUser = function (id) {
			$.ajax({
				type: 'GET',
				url: "/user",
				async: false,
				data: {
					id: id
				},
				success: function (data) {
					$scope.user = data;
					$scope.user.datebirth = $filter('date')($scope.user.datebirth, 'dd/MM/yyyy');
					$('#myModal').modal('show');
					//$scope.listUsers();
				}
			});
		};

		$scope.saveUser = function () {
			$.ajax({
				type: 'POST'
				url: "/user",
				async: false,
				data: {
					user: $scope.user
				},
				success: function (data) {
					$('#myModal').modal('hide');
					$scope.listUsers();
				}
			});
		};

		$scope.addUserToRemove = function (id) {
			$scope.user.id = id;
		};

		$scope.removeUser = function () {
			$.ajax({
				type: 'DELETE',
				url: "/user",
				async: false,
				data: {
					id: $scope.user.id
				},
				success: function (data) {
					$('#myConfirmModal').modal('hide');
					$scope.listUsers();
				}
			});
		}
	}]);

$(document).ready(function () {
	$("#datebirth").mask("99/99/9999");
	$('#datebirth').datepicker({
		language: 'pt-BR'
	});
});

