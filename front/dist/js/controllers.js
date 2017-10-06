// controller.js
angular
.module('app')
.controller('panel', ['$http', panel]);

var URLBASE = 'https://planespostpago.herokuapp.com';

function panel($http) {
	var vm = this;
	$http.get(URLBASE + '/solicitudes')
	.then(function(response) {
      vm.solNuevas = response.data;
      console.log(response.data);
	});
}