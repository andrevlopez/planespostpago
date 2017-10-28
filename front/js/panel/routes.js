var accessUser = {
  'call-center': [
    'app.components.crm', 
    'app.components.listaUsuarios',
    'app.components.nuevoUsuario',
    'app.components.editarUsuario',
    'app.components.eliminarUsuario',
    'app.components.usuariosRegistrados'],
  'supervisor': [
    'app.components.listaUsuarios',
    'app.components.nuevoUsuario',
    'app.components.editarUsuario',
    'app.components.eliminarUsuario',
    'app.components.usuariosRegistrados']
  };

angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
  $stateProvider
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
    },
    onEnter: $state => {
    const session = sessionStorage.getItem('access');
    setTimeout(() => {
      if (session in accessUser) {
        const props = accessUser[session];
        if (props.includes($state.$current.name)) {
          $state.go('app.components.access');
        }
      }
    }, 500);
    }
  })
  .state('app.components.nuevoUsuario', {
    url: '/usuarios/nuevo',
    templateUrl: 'views/panel/nuevoUsuario.html',
    ncyBreadcrumb: {
      label: 'Nuevo Usuario'
    },
    onEnter: $state => {
    const session = sessionStorage.getItem('access');
    setTimeout(() => {
      if (session in accessUser) {
        const props = accessUser[session];
        if (props.includes($state.$current.name)) {
          $state.go('app.components.access');
        }
      }
    }, 500);
    }
  })
  .state('app.components.editarUsuario', {
    url: '/usuarios/editar',
    templateUrl: 'views/panel/editarUsuario.html',
    ncyBreadcrumb: {
      label: 'Editar Usuario'
    },
    onEnter: $state => {
    const session = sessionStorage.getItem('access');
    setTimeout(() => {
      if (session in accessUser) {
        const props = accessUser[session];
        if (props.includes($state.$current.name)) {
          $state.go('app.components.access');
        }
      }
    }, 500);
    }
  })
  .state('app.components.eliminarUsuario', {
    url: '/usuarios/eliminar',
    templateUrl: 'views/panel/eliminarUsuario.html',
    ncyBreadcrumb: {
      label: 'Eliminar Usuario'
    },
    onEnter: $state => {
    const session = sessionStorage.getItem('access');
    setTimeout(() => {
      if (session in accessUser) {
        const props = accessUser[session];
        if (props.includes($state.$current.name)) {
          $state.go('app.components.access');
        }
      }
    }, 500);
    }
  })
  .state('app.components.nuevoPlan', {
    url: '/usuarios/planes/nuevo',
    templateUrl: 'views/panel/nuevoPlan.html',
    ncyBreadcrumb: {
      label: 'Nuevo Plan'
    }
  })
  .state('app.components.listaPlanes', {
    url: '/usuarios/planes/lista',
    templateUrl: 'views/panel/listaPlanes.html',
    ncyBreadcrumb: {
      label: 'Lista de Planes'
    }
  })
  .state('app.components.editarPlanes', {
    url: '/usuarios/planes/editar',
    templateUrl: 'views/panel/editarPlanes.html',
    ncyBreadcrumb: {
      label: 'Editar Planes'
    }
  })
  .state('app.components.eliminarPlanes', {
    url: '/usuarios/planes/eliminar',
    templateUrl: 'views/panel/eliminarPlanes.html',
    ncyBreadcrumb: {
      label: 'Eliminar Planes'
    }
  })
  .state('app.components.crm', {
    url: '/CRM',
    templateUrl: 'views/CRM/home.html',
    ncyBreadcrumb: {
      label: 'CRM'
    },
    onEnter: $state => {
    const session = sessionStorage.getItem('access');
    setTimeout(() => {
      if (session in accessUser) {
        const props = accessUser[session];
        if (props.includes($state.$current.name)) {
          $state.go('app.components.access');
        }
      }
    }, 500);
    }
  })
  .state('app.components.usuariosRegistrados', {
    url: '/CRM/usuarios',
    templateUrl: 'views/CRM/usuarios.html',
    ncyBreadcrumb: {
      label: 'Usuarios registrados'
    },
    onEnter: $state => {
    const session = sessionStorage.getItem('access');
    setTimeout(() => {
      if (session in accessUser) {
        const props = accessUser[session];
        if (props.includes($state.$current.name)) {
          $state.go('app.components.access');
        }
      }
    }, 500);
    }
  })
  .state('app.components.tickets', {
    url: '/CRM/tickets',
    templateUrl: 'views/CRM/tickets.html',
    ncyBreadcrumb: {
      label: 'Tickets'
    }
  })
  .state('app.components.access', {
    url: '/access',
    templateUrl: 'views/common/access.html',
    ncyBreadcrumb: {
      label: 'Tickets'
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
