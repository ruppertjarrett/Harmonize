(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];

    function ProfileCtrl($location, $scope, $localStorage, socket) {

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