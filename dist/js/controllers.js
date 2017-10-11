// controller.js
angular
.module('app')
.controller('panel', ['$http', '$state', panel]);

const URLBASE = 'https://planespostpago.herokuapp.com';

function panel($http, $state) {
	var vm = this;
	vm.edit = [];
	let session = sessionStorage.getItem('session');

	function resetEdit() {
	  vm.edit.forEach((e,i)=>vm.edit[i] = false);
	}

	setTimeout(()=> {
       session?true:$state.go('login');
	}, 500);

	$http.get(URLBASE + '/solicitudes')
	.then(function(response) {
      vm.solNuevas = response.data;
	});

	$http.get(URLBASE + '/usuarios')
	.then(function(response) {
      vm.listaUsuarios = response.data;
	});

	vm.editarCampo = i => vm.edit[i] = true;

	vm.updateUser = () => {
      vm.edit.forEach((e,i) => {
        if (e) {
        	$http.put(URLBASE+'/usuarios', {
        	  id: vm.listaUsuarios[i].id,
              nombre: vm.listaUsuarios[i].nombre,
              apellido: vm.listaUsuarios[i].apellido,
              cargo: vm.listaUsuarios[i].cargo,
              email: vm.listaUsuarios[i].email
        	}).then(res=>console.log(res.data));
        }
      })
      $state.go('app.success');
      resetEdit();
	};

	vm.cancelForms = () => {
      resetEdit();
	};
}