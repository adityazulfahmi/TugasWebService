/**
 * Created by ajou on 8/19/2016.
 */
var module = angular.module('missingApp', ['ngFileUpload']);
module.controller('MainCtrl', ['$scope', '$http','$window' ,'Upload', function ($scope, $http,$window, Upload) {
    // $scope.user ={};
    // $scope.user.username ='';
    $scope.user ={};
    $scope.user.username ='';



    $scope.submit = function () {
        $scope.upload($scope.file);
    }


    $scope.upload = function () {
        var date = new Date();
        $scope.year = date.getFullYear();
        Upload.upload({
                url : 'http://localhost:3000/add',
                method : 'POST',
                data : {
                    photo    : $scope.file,
                    name    : $scope.name,
                    dob     : $scope.dob,
                    pob     : $scope.pob,
                    hair    : $scope.hair,
                    eyes    : $scope.eyes,
                    height  : $scope.height,
                    weight  : $scope.weight,
                    sex     : $scope.sex,
                    race    : $scope.race,
                    sam     : $scope.sam,
                    reward  : $scope.reward,
                    remarks : $scope.remarks,
                    details : $scope.details,
                    contact : $scope.contact,
                    year : $scope.year
                }

            }).progress(function (evt) {
                console.log("firing");

            }).success(function (data) {
                alert("Success to add person");
                $window.location.href = 'index.html';

            }).error(function (error) {
                console.log(error);
            })
    }


}]);


module.controller('CommentCtrl', ['$scope', '$http' , function ($scope, $http) {
    // $scope.user ={};
    // $scope.user.username ='';
    $scope.submitComment = function () {

        $http({
            method : 'POST',
            url : 'http://localhost:3000/addComment',
            data : {
                id   : "57b7e1c6c38da0a81faa2a7c",
                email     : $scope.email,
                comment    : $scope.comment
            }
        })
            .success(function(data, status, headers, config) {
                if( data ) {
                    alert(data);
                }
                else {
                }
            })
            .error(function(data, status, headers, config) {
                console.log(status);
            });
    };
}]);
