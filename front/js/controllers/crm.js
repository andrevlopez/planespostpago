// controller.js
angular
.module('app')
.controller('crm', ['$http',crm]);

const URLTICKETS = `https://zammad.zonngo.com/api/v1/ticket_articles`;

function crm($http) {
  let vm = this;
  function getClients() {
    $http.get(URLBASE + '/clientes')
    .then(function(response) {
      vm.listaClientes = response.data;
    });
  }

  function getTickets() {
    const myHeaders = new Headers();
    myHeaders.append('Authorization','Basic Y2VzYXJvZHJpZ3VlejRAZ21haWwuY29tOnpvbm5nbw==');
    myHeaders.append('Content-Type','application/json');
  	fetch(URLTICKETS, {
      method: 'GET',
      headers: myHeaders
    })
    .then(response => {
      response.json().then(function(data) {
        vm.tickets = data;
      });
    })
    .then(error => {
      console.log(error);
    });
  }
  getClients();
  getTickets();
};