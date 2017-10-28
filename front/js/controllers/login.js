// controller.js
angular
.module('app')
.controller('login', ['$http', '$state', login]);

function login($http, $state) {
  let vm = this;
  vm.ingresa = `Ingresa ahora`;
  vm.send = () => {
  	console.log('click');
  	$http.post(URLBASE + '/login', {
      usuario:vm.username,
      password:vm.password
  	}).then(result => {
      if (result.data) {
      	sessionStorage.setItem('session', true);
        sessionStorage.setItem('access', result.data.access);
      	$state.go('app.main');
      } else {
      	vm.ingresa = `Credenciales inválidas`;	
      }
  	});
  };
}