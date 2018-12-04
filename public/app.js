'use strict';

angular
    .module('app', [
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'ngLodash'
    ])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/home', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/main', {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl'
            })
            .when('/join', {
                templateUrl: 'join/join.html',
                controller: 'JoinCtrl'
            })
            .when('/newfile', {
                templateUrl: 'newfile/newfile.html',
                controller: 'NewFileCtrl'
            })
            .when('/folder', {
                templateUrl: 'folder/folder.html',
                controller: 'FolderCtrl'
            })
            .when('/usersettings', {
                templateUrl: 'usersettings/usersettings.html',
                controller: 'UserSettingsCtrl'
            })
            .when('/profile', {
                templateUrl: 'profile/profile.html',
                controller: 'ProfileCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('Connected');
// });