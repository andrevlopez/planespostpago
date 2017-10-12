// controller.js
angular
.module('app')
.controller('panel', ['$http', '$state', panel]);

const URLBASE = 'https://planespostpago.herokuapp.com';

function panel($http, $state) {
	var vm = this;
	vm.edit = [];
	vm.acumEliminar = [];
	let session = sessionStorage.getItem('session');

	function resetEdit() {
	  vm.edit.forEach((e,i)=>vm.edit[i] = false);
	}

	setTimeout(()=> {
       session?true:$state.go('login');
	}, 500);
    
    function getSol() {
      $http.get(URLBASE + '/solicitudes')
	  .then(function(response) {
        vm.solNuevas = response.data;
	  });
    }
	
    function getLista() {
      $http.get(URLBASE + '/usuarios')
	  .then(function(response) {
        vm.listaUsuarios = response.data;
        vm.numLista = vm.listaUsuarios.length;
	  });
    }

    getSol();
    getLista();
	
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
        	});
        }
      })
      $state.go('app.success');
      resetEdit();
	};

	vm.cancelForms = () => {
      resetEdit();
	};

	vm.eliminarUsuario = i => {
	  vm.acumEliminar.push(vm.listaUsuarios[i]);
      vm.listaUsuarios.splice(i,1);
	};

	vm.resetEliminar = () => {
      getLista();
      vm.acumEliminar = [];
	};

	vm.sendDelete = () => {
      vm.acumEliminar.forEach(x => {
        $http.post(URLBASE+'/deleteUsuario', {
        	id: x.id
        });
      });
      $state.go('app.success');
	};
}