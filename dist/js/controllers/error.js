// controller.js
angular
.module('app')
.controller('error', ['$stateParams', '$state', error]);

function error($stateParams, $state) {
  var vm = this;
  vm.msg = $stateParams.error;
  vm.home = () => {
  	$state.go('app.main');
  }
}