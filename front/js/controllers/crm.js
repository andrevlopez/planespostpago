// controller.js
angular
.module('app')
.controller('crm', [crm]);

function crm($http) {
  let vm = this;
  function getClients() {
    $http.get(URLBASE + '/clientes')
    .then(function(response) {
      vm.listaClientes = response.data;
    });
  }
  getClients();
};