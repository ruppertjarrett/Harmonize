(function() {
    'use strict';

    angular
        .module('app')
        .controller('FolderCtrl', FolderCtrl);

    FolderCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];

    function FolderCtrl($location, $scope, $localStorage, socket) {

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