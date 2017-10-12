angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
  $stateProvider
  .state('app.icons', {
    url: "/icons",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Icons'
    }
  })
  .state('app.icons.fontawesome', {
    url: '/font-awesome',
    templateUrl: 'views/icons/font-awesome.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    }
  })
  .state('app.icons.simplelineicons', {
    url: '/simple-line-icons',
    templateUrl: 'views/icons/simple-line-icons.html',
    ncyBreadcrumb: {
      label: 'Simple Line Icons'
    }
  })
  .state('app.components', {
    url: "/components",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Secciones'
    }
  })
  .state('app.components.solNuevas', {
    url: "/solicitudes/nuevas",
    templateUrl: 'views/panel/nuevaSolicitud.html',
    ncyBreadcrumb: {
      label: 'Solicitudes Nuevas'
    }
  })
  .state('app.components.solRealizadas', {
    url: "/solicitudes/realizadas",
    templateUrl: 'views/panel/solRealizadas.html',
    ncyBreadcrumb: {
      label: 'Solicitudes Realizadas'
    }
  })
  .state('app.components.listaUsuarios', {
    url: '/usuarios/lista',
    templateUrl: 'views/panel/listaUsuarios.html',
    ncyBreadcrumb: {
      label: 'Lista de Usuarios'
    }
  })
  .state('app.components.nuevoUsuario', {
    url: '/usuarios/nuevo',
    templateUrl: 'views/panel/nuevoUsuario.html',
    ncyBreadcrumb: {
      label: 'Nuevo Usuario'
    }
  })
  .state('app.components.editarUsuario', {
    url: '/usuarios/editar',
    templateUrl: 'views/panel/editarUsuario.html',
    ncyBreadcrumb: {
      label: 'Editar Usuario'
    }
  })
  .state('app.components.eliminarUsuario', {
    url: '/usuarios/eliminar',
    templateUrl: 'views/panel/eliminarUsuario.html',
    ncyBreadcrumb: {
      label: 'Eliminar Usuario'
    }
  })
  .state('app.forms', {
    url: '/forms',
    templateUrl: 'views/forms.html',
    ncyBreadcrumb: {
      label: 'Forms'
    },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load([
          {
            serie: true,
            files: ['js/libs/moment.min.js']
          },
          {
            serie: true,
            files: ['js/libs/daterangepicker.min.js', 'js/libs/angular-daterangepicker.min.js']
          },
          {
            files: ['js/libs/mask.min.js']
          },
          {
            files: ['js/libs/select.min.js']
          }
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['js/controllers/forms.js']
        });
      }]
    }
  })
  .state('app.widgets', {
    url: '/widgets',
    templateUrl: 'views/widgets.html',
    ncyBreadcrumb: {
      label: 'Widgets'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/widgets.js']
        });
      }]
    }
  })
}]);
