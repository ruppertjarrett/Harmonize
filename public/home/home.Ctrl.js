(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$location', '$scope'];

    function HomeCtrl($location, $scope) {
        $scope.logIn = function() {
            $location.path('/join');
        }


        $scope.newfile = function() {
            $location.path('/newfile');
        }
        $scope.profile = function() {
            $location.path('/profile');
        }
        $scope.usersettings = function() {
            $location.path('/usersettings');
        }
        $scope.folder = function() {
            $location.path('/folder');
        }
    }
})();