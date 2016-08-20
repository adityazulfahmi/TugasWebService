/**
 * Created by ajou on 8/19/2016.
 */
var module = angular.module('missingApp', []);
module.controller('MainCtrl', ['$scope', '$http' , function ($scope, $http) {
    // $scope.user ={};
    // $scope.user.username ='';
    $scope.submit = function () {
        var date = new Date();
        $scope.year = date.getFullYear();

        $http({
            method : 'POST',
            url : 'http://localhost:3000/add',
            data : {
               // photo   : $scope.photo,
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
        })
            .success(function(data, status, headers, config) {
                if( data ) {
                    alert(data);
                    //$scope.members= data;
                }
                else {
                }
            })
            .error(function(data, status, headers, config) {
                console.log(status);
            });
    };
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
