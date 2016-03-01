export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    });

    $stateProvider
    .state('play', {
      url: '/play/:id/:name',
      templateUrl: 'app/play/play.html',
      controller: 'PlayController',
      controllerAs: 'play'
    });

  $urlRouterProvider.otherwise('/');
}
