// controller.js
angular
.module('app')
.controller('panel', ['$http', '$state', panel]);

const URLBASE = 'https://planespostpago.herokuapp.com';

function panel($http, $state) {
	var vm = this;
	let session = sessionStorage.getItem('session');

	setTimeout(()=> {
       session?true:$state.go('login');
	}, 1000);

	$http.get(URLBASE + '/solicitudes')
	.then(function(response) {
      vm.solNuevas = response.data;
	});
}