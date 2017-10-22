// controller.js
angular
.module('app')
.controller('nuevoUsuario', ['$http', '$state', nuevoUsuario]);

function nuevoUsuario($http, $state) {
  let vm = this;
  vm.clear = () => {
    vm.nombre = '';
    vm.apellido = '';
    vm.username = '';
    vm.email = '';
    vm.password = '';
    vm.password2 = '';
    vm.cargo = '';
  };

  vm.save = () => {
    $http.post(URLBASE+'/registroUsuario', {
      usuario: vm.username,
      password: vm.password,
      nombre: vm.nombre,
      apellido: vm.apellido,
      cargo: vm.cargo,
      email: vm.email
    }).then(response => {
      if(response.data.error) {
        $state.go('app.error', {error: response.data.error});
      } else {
        socket.emit('new-notification', {
          tipo: 'Usuarios',
          detalles: 'Se ha creado un nuevo usuario',
          fecha: new Date()
        });
        $state.go('app.success');
      }
    });
  };
}