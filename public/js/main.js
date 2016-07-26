
/*
 Main v2.0.0
 Date: 2016-07-26
 (c) 2013 Gustavo Isensee
 License: MIT
*/

angular.module('App', [])
.controller('AppController', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
	$scope.search = '';
	$scope.list = [];
	$scope.user = {
		id: 0,
		name: '',
		datebirth: ''
	};

	$scope.listUsers = function () {
		$http({
			method: 'GET',
			url: "/user",
		}).then(function(d){
			$scope.list = d.data;		
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
		$http({
			method: 'GET',
			url: "/user/" + id,
		}).then(function(d) {
				$scope.user = d.data;
				$scope.user.datebirth = $filter('date')($scope.user.datebirth, 'dd/MM/yyyy');
				$('#myModal').modal('show');
		})
	};

	$scope.saveUser = function () {
		const method = ($scope.user.id > 0 ? 'PUT' : 'POST');
		const url = ($scope.user.id > 0 ? '/user/' + $scope.user.id : '/user');
		$http({
			method: method,
			url: url,
			params: $scope.user
		}).then(function(d){
			$('#myModal').modal('hide');
			$scope.listUsers();
		});
	};

	$scope.addUserToRemove = function (id) {
		$scope.user.id = id;
	};

	$scope.removeUser = function () {
		$http({
			method: 'DELETE',
			url: "/user/" + $scope.user.id
		}).then(function(d){
			$('#myConfirmModal').modal('hide');
			$scope.listUsers();
		});
	}
}]);

$(document).ready(function () {
	$("#datebirth").mask("99/99/9999");
	$('#datebirth').datepicker({
		language: 'pt-BR'
	});
});