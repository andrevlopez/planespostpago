// controller.js
angular
.module('app')
.controller('crm', ['$http',crm]);

const URLTICKETS = `https://zammad.zonngo.com/api/v1/users`;

function crm($http) {
  let vm = this;
  function getClients() {
    $http.get(URLBASE + '/clientes')
    .then(function(response) {
      vm.listaClientes = response.data;
    });
  }

  function getTickets() {
  	$http.get(URLTICKETS, {
  		headers: {
  			'Content-type': 'application/json'
  		}
  	})
  	.then(response => {
  	  console.log('lentamente');
  	  console.log(response);
      vm.listaTickets = response.data;
  	})
  	.then(error => {
  		console.log(error);
  	});
  }
  getClients();
  getTickets();
};