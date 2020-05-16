var myApp = angular.module('myApp', ["qbApp"]);
myApp.controller('myCtrl', ['$scope','$window','$compile','qbImgCrop', function($scope,$window,$compile,qbImgCrop) {
    $scope.id=45;
    $scope.someFun=function(){
        console.log("You Got Success")
    }
}]);
