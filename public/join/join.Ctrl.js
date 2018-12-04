(function() {
    'use strict';

    angular
        .module('app')
        .controller('JoinCtrl', JoinCtrl);

    JoinCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];

    function JoinCtrl($location, $scope, $localStorage, socket) {
        $scope.name = '';
        var nickname;

        $scope.join = function() {
            nickname = $scope.name;
            $localStorage.nickname = nickname;

            socket.emit('join', {
                nickname: nickname
            });

            $location.path('/main');
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