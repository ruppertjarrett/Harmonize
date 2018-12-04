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
            }
        });

    };
})();

function saveText() {
    var text = document.getElementById('themsg').value;
    var textFile = new Blob([text], { type: 'text/plain' });
    var fileName = document.getElementById('projectName').value;

    var download = document.createElement("a");
    download.download = text;
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