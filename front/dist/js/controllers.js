// controller.js
angular
.module('app')
.controller('panel', ['$http', '$state','$rootScope', panel]);

const URLBASE = 'https://planespostpago.herokuapp.com';

function panel($http, $state) {
	var vm = this;
	vm.edit = [];
  vm.editPlan = [];
	vm.acumEliminar = [];
  vm.acumEliminarPlan = [];
	let session = sessionStorage.getItem('session');

	function resetEdit() {
	  vm.edit.forEach((e,i)=>vm.edit[i] = false);
	}

  function resetEditPlan() {
    vm.editPlan.forEach((e,i)=>vm.editPlan[i] = false);
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
	
  function getListaUsuarios() {
    $http.get(URLBASE + '/usuarios')
	  .then(function(response) {
      vm.listaUsuarios = response.data;
      vm.numLista = vm.listaUsuarios.length;
	  });
  }

  function getListaPlanes() {
    $http.get(URLBASE+'/planes')
    .then(res => {
      console.log(res.data);
      vm.listaPlanes = res.data;
    });
  }

  getSol();
  getListaUsuarios();
  getListaPlanes();
	
	vm.editarCampo = i => vm.edit[i] = true;
  vm.editarCampoPlan = i => vm.editPlan[i] = true;

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
    });
    $state.go('app.success');
    resetEdit();
	};

  vm.updatePlan = () => {
    console.log(vm.editPlan);
    vm.editPlan.forEach((e,i) => {
      if (e) {
        const update = {
          id: vm.listaPlanes[i].id,
          tipoPlan: vm.listaPlanes[i].tipoPlan,
          nombrePlan: vm.listaPlanes[i].nombrePlan,
          contratoPlan: vm.listaPlanes[i].contratoPlan,
          marcaEquipo: vm.listaPlanes[i].marcaEquipo,
          modeloEquipo: vm.listaPlanes[i].modeloEquipo,
          enlaceImagen: vm.listaPlanes[i].enlaceImagen,
          precioEquipo: vm.listaPlanes[i].precioEquipo,
          precioPlan: vm.listaPlanes[i].precioPlan,
          minutos: vm.listaPlanes[i].minutos,
          datos: vm.listaPlanes[i].datos,
          sms: vm.listaPlanes[i].sms,
          redesSociales: vm.listaPlanes[i].redesSociales,
          oferta: vm.listaPlanes[i].oferta
        };
        $http.put(URLBASE+'/planes', update);
      }
    });
    $state.go('app.success');
    resetEditPlan();
  };


	vm.cancelForms = () => {
    resetEdit();
	};
  vm.cancelEditPlan = () => {
    resetEditPlan();
  };

	vm.eliminarUsuario = i => {
	  vm.acumEliminar.push(vm.listaUsuarios[i]);
      vm.listaUsuarios.splice(i,1);
	};

  vm.eliminarPlan = i => {
    vm.acumEliminarPlan.push(vm.listaPlanes[i]);
      vm.listaPlanes.splice(i,1);
  };

	vm.resetEliminar = () => {
      getListaUsuarios();
      vm.acumEliminar = [];
	};

  vm.resetEliminarPlan = () => {
      getListaPlanes();
      vm.acumEliminarPlan = [];
  };

	vm.sendDelete = () => {
    vm.acumEliminar.forEach(x => {
      $http.post(URLBASE+'/deleteUsuario', {
        id: x.id
      });
    });
    $state.go('app.success');
  };

  vm.sendDeletePlan = () => {
    vm.acumEliminarPlan.forEach(x => {
      $http.post(URLBASE+'/deletePlan', {
        id: x.id
      });
    });
    $state.go('app.success');
  };
  
  vm.resetEd = () => {
    getListaPlanes();
  }
}