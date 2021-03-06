// controller.js
angular
.module('app')
.controller('panel', ['$http', '$state', panel]);

const URLBASE = 'https://planespostpago.herokuapp.com';
//const URLBASE = 'http://localhost:5000';
const ICONAPP = '../../img/icon.png';
var socket = io(URLBASE);

function panel($http, $state, $rootScope) {
	var vm = this;
	vm.edit = [];
  vm.editPlan = [];
	vm.acumEliminar = [];
  vm.acumEliminarPlan = [];
  vm.acumNoVistas = 0;
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

  function getNotificaciones() {
    $http.get(URLBASE + '/notificaciones')
    .then(res => {
      vm.notificaciones = res.data.reverse();
    });
  }

  function getListaPlanes() {
    $http.get(URLBASE+'/planes')
    .then(res => {
      vm.listaPlanes = res.data;
    });
  }

  function checkNotifications() {
    if (!("Notification" in window)) {
      console.error("Notifications aren't supported in this browser");
    } else if (Notification.permission === "granted") {
      var notification = new Notification("Las notificaciones push están activas.");
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(per => {
        if (per === 'granted') {
          var notification = new Notification('Las notificaciones push han sido permitidas.')
        }
      });
    }
  }

  socket.on('broadcast-notification', ()=> {
    vm.acumNoVistas += 1;
    getNotificaciones();
  });

  getSol();
  getListaUsuarios();
  getListaPlanes();
  getNotificaciones();
  checkNotifications();
	
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
    socket.emit('new-notification', {
      tipo: 'Usuarios',
      detalles: 'Se ha actualizado un usuario',
      fecha: new Date()
    });
    var n = new Notification('Usuarios', {
      body: 'Se ha actualizado un plan',
      icon: ICONAPP
    });
    $state.go('app.success');
    resetEdit();
	};

  vm.updatePlan = () => {
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
    socket.emit('new-notification', {
      tipo: 'Planes, equipos y telefonías',
      detalles: 'Se ha actualizado un plan',
      fecha: new Date()
    });
    var n = new Notification('Planes, equipos y telefonías', {
      body: 'Se ha actualizado un plan',
      icon: ICONAPP
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
    socket.emit('new-notification', {
      tipo: 'Usuarios',
      detalles: 'Se ha eliminado un usuario.',
      fecha: new Date()
    });
    var n = new Notification('Usuarios', {
      body: 'Se ha eliminado un usuario',
      icon: ICONAPP
    });
    $state.go('app.success');
  };

  vm.sendDeletePlan = () => {
    vm.acumEliminarPlan.forEach(x => {
      $http.post(URLBASE+'/deletePlan', {
        id: x.id
      });
    });
    socket.emit('new-notification', {
      tipo: 'Planes, equipos y telefonías',
      detalles: 'Se ha eliminado un plan',
      fecha: new Date()
    });
    var n = new Notification('Planes, equipos y telefonías', {
      body: 'Se ha eliminado un plan',
      icon: ICONAPP
    });
    $state.go('app.success');
  };
  
  vm.resetEd = () => {
    getListaPlanes();
  };

  vm.logOff = () => {
    sessionStorage.setItem('session', false);
    $state.go('login');
  };

  vm.formatDate = date => {
    const fecha = new Date(date);
    return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
  };

  vm.resetCountNews = () => {
    vm.acumNoVistas = 0;
  };
}