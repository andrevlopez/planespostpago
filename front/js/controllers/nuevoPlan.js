// controller.js
angular
.module('app')
.controller('nuevoPlan', ['$http', '$state', nuevoPlan]);

function nuevoPlan($http, $state) {
  let vm = this;
  vm.showContent = data => {
    //vm.csvData
    const datos = data.split(';');
    vm.csvData = [];

    const key = ['tipoPlan', 'nombrePlan', 'contratoPlan', 
    'marcaEquipo', 'modeloEquipo', 'enlaceImagen',
    'precioEquipo', 'precioPlan', 'minutos', 
    'datos', 'sms', 'redesSociales', 'oferta'];
    
    for (var i = 0, i1 = 0; i < datos.length; i += key.length, i1++) {
      vm.csvData[i1] = {};
      for (var j = 0; i + j < datos.length && j < key.length; j++) {
        vm.csvData[i1][key[j]] = datos[i + j];
      }
    }

    vm.sendPlan = () => {
      // Envia los datos aqui
      vm.csvData.forEach(element => {
        console.log(element);
        $http.post(URLBASE+'/nuevoPlan', {
          tipoPlan: element.tipoPlan,
          nombrePlan: element.nombrePlan,
          contratoPlan: element.contratoPlan,
          marcaEquipo: element.marcaEquipo,
          modeloEquipo: element.modeloEquipo,
          enlaceImagen: element.enlaceImagen,
          precioEquipo: element.precioEquipo,
          precioPlan: element.precioPlan,
          minutos: element.minutos,
          datos: element.datos,
          sms: element.sms,
          redesSociales: element.redesSociales,
          oferta: element.oferta
        });
      });
      $state.go('app.success');
    };

    vm.cancel = () => {

    };
  };
};