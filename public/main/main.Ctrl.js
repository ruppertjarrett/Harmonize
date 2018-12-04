(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

    function MainCtrl($scope, $localStorage, socket, lodash) {
        $scope.msg = document.getElementById('themsg');
        $scope.projectName = document.getElementById('projectName');
        $scope.message = '';
        $scope.users = [];
        $scope.messages = [];
        $scope.likes = [];
        $scope.mynickname = $localStorage.nickname;
        var nickname = $scope.mynickname;


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

        $scope.joinPrivate = function() {
            socket.emit('join-private', {
                nickname: nickname
            });
            console.log('private room joined!');
        }

        $scope.groupPm = function() {
            socket.emit('private-chat', {
                message: 'hello everybody!'
            });
        }

        socket.on('show-message', function(data) {
            console.log(data);
        });

        socket.emit('get-users');

        $scope.sendMessage = function(data) {
            var newMessage = {
                message: $scope.message,
                from: nickname
            }
            socket.emit('send-message', newMessage);
            // $scope.messages.push(newMessage);
            $scope.message = '';
        };

        $scope.sendLike = function(user) {
            console.log(user);
            var id = lodash.get(user, 'socketid');
            var likeObj = {
                from: nickname,
                like: id
            }
            socket.emit('send-like', likeObj);
        }

        socket.on('all-users', function(data) {
            console.log(data);
            $scope.users = data.filter(function(item) {
                return item.nickname !== nickname;
            });

        });

        socket.on('user-liked', function(data) {
            console.log(data);
            console.log(data.from);
            $scope.likes.push(data.from);
        });

        socket.on('message-received', function(data) {
            $scope.messages.push(data);
        });

        socket.on('update', function(data) {
            $scope.users = [];
            $scope.users = data.filter(function(item) {
                return item.nickname !== nickname;
            });
            var msgObj = {
                key: 'LeftShift',
                keyCode: 16,
                code: 'please',
                from: 'admin',
                doc: $scope.users[0].document.getElementById('themsg').value
            }
            socket.emit('user-typing', )
        });
        $scope.msg.addEventListener('keyup', function(e) {
            console.log(e.key);
            var msgObj = {
                key: e.key,
                keyCode: e.keyCode,
                code: e.code,
                from: nickname,
                doc: $scope.msg.value
            };
            console.log(msgObj);
            socket.emit('user-typing', msgObj);
        });

        socket.on('user-typed', function(data) {
            var newMSG = {
                message: data.key,
                from: data.nickname,
                newDocument: data.doc
            }
            if (data.keyCode >= 65 && data.keyCode <= 90 || data.keyCode == 9 || data.keyCode == 32 || data.keyCode >= 48 && data.keyCode <= 57 || data.keyCode >= 186 && data.keyCode <= 192 || data.keyCode >= 219 && data.keyCode <= 222) {
                // $scope.msg.value += newMSG.message;
                $scope.msg.value = newMSG.newDocument;
            } else if (data.keyCode == 8) {
                // $scope.msg.value = $scope.msg.value.substring(0, $scope.msg.value.length - 1);
                $scope.msg.value = newMSG.newDocument;
            } else if (data.keyCode == 16) {
                $scope.msg.value = newMSG.newDocument
            }
        });

    };
})();

function saveText() {
    var text = document.getElementById('themsg').value;
    var textFile = new Blob([text], { type: 'text/html' });
    var fileName = document.getElementById('projectName').value;

    var download = document.createElement("a");
    download.download = fileName;
    download.innerHTML = "Download File";
    download.href = window.webkitURL.createObjectURL(textFile);
    download.click();

    function removeDownload(event) {
        document.body.removeChild(event.target);
    }
}

function loadFile() {
    var loadFile = document.getElementById("LoadFile").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoaded) {
        var loadedText = fileLoaded.target.result;
        document.getElementById("themsg").value = loadedText;
    };
    fileReader.readAsText(loadFile, "UTF-8");
}


function runHtml() {
    if (document.getElementById('main').contains(document.getElementById('iframe'))) {
        document.getElementById('main').removeChild(document.getElementById('iframe'));
    }
    var iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    var main = document.getElementById('main');
    var content = document.getElementById('themsg').value;

    main.appendChild(iframe);

    iframe.contentWindow.document.open('text/html', 'replace');
    iframe.contentWindow.document.write(content);
    iframe.contentWindow.document.close();
}