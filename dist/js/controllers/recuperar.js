// controller.js
angular
.module('app')
.controller('recuperar', ['$http', '$state', login]);

function login($http, $state) {
  let vm = this;
  vm.ingresa = `Ingresa tu email`;
  vm.send = () => {
  	$http.post(URLBASE + '/recuperar', {
      email:vm.email
  	}).then(result => {
      console.log(result);
  	});
  };
}