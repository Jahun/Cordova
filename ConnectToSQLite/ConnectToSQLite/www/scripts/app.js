
var db = null;
document.addEventListener('deviceready', function onDeviceReady() {
    angular.bootstrap(document, ['starter']);
}, false);
var ionicApp = angular.module('starter', ['ionic', 'ngCordova']);

ionicApp.run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
       /* if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }*/
        window.plugins.sqlDB.copy("populated.db",0, function () {
            db = $cordovaSQLite.openDB("populated.db");
        }, function (error) {
            console.error("There was an error copying the database: " + error);
            db = $cordovaSQLite.openDB("populated.db");
        });
       
    });
    alert(db);
});

ionicApp.controller("ExampleController", function ($scope, $cordovaSQLite) {

    $scope.selectAll = function () {
        var query = "SELECT name FROM people";
       
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            if (res.rows.length > 0) {
                alert("SELECTED -> " + res.rows.item(0).name);
                for (var i = 0; i < 10; i++) {
                    console.log("SELECTED -> " + res.rows.item(i).name);
                }
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

});