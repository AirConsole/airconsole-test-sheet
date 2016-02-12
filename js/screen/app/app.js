/**
  Angular JS setup
*/
var Config = {
  // @const {String} APP_NAME - The name of the angular module
  APP_NAME: 'testApp',
  // @var {Object} dependencies - Dictionary of the angular dependency modules
  dependencies: {
    controllers: 'testAppControllers',
    services: 'testAppServices',
    directives: 'testAppDirectives',
    filters: 'testAppFilters'
  },

  /**
   * @desc Returns list of dependencies
   * @return {Array}
   */
  getDependencies: function() {
    var dependencies = [];
    for(var depenceny in this.dependencies) {
      dependencies.push(this.dependencies[depenceny]);
    }
    dependencies.push('ngRoute');
    return dependencies;
  }
};

var TestApp = TestApp || {
  app: null,
  services: null,
  controllers: null,
  directives: null
};

/**
 * Provide shortcut and to avoid long module code.
 * Instead use it like:
 *   TestApp.controllers.controller('YourCtrl', ['$scope', function ($scope) { ... }]);
 */
TestApp.controllers = angular.module(Config.dependencies.controllers, []);
TestApp.services = angular.module(Config.dependencies.services, []);
TestApp.directives = angular.module(Config.dependencies.directives, []);
TestApp.filters = angular.module(Config.dependencies.filters, []);

TestApp.app = angular.module(Config.APP_NAME, Config.getDependencies());

TestApp.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'js/screen/app/partials/_main_view.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
