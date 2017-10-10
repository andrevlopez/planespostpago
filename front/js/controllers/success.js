// controller.js
angular
.module('app')
.controller('success', ['$stateParams', '$state', success]);

function success($stateParams, $state) {
  var vm = this;
  vm.msg = $stateParams.success;
  vm.home = () => {
  	$state.go('app.main');
  }
}