/**
 * Created by ajou on 8/19/2016.
 */
var module = angular.module('missingApp', ['ngFileUpload, ngResource']);
module.controller('MainCtrl', ['$scope', '$http' ,'Upload', '$resource', function ($scope, $http,Upload,$resource) {
    // $scope.user ={};
    // $scope.user.username ='';
    $scope.user ={};
    $scope.user.username ='';
    var FindByName = $resource('http://localhost:3000/people/name/:name',
        {name : '@userName'},
        {'get' : {method: 'GET', isArray :false}},
        {'query' : {method: 'GET', isArray:true}}
    );

    $scope.getPerson = function () {
        if($scope.name !=null){
            FindByName.query().
            $promise.then(function (information) {
                $scope.members =information;

                // $scope.name = information.name;
                // $scope.dob = information.dob;
                // $scope.pob = information.pob;
                // $scope.hair = information.hair;
                // $scope.eyes = information.eyes;
                // $scope.height = information.height;
                // $scope.photo = information.photo;
                // $scope.weight = information.weight;
                // $scope.sex = information.sex;
                // $scope.race = information.race;
                // $scope.sam = information.sam;
                // $scope.reward = information.reward;
                // $scope.remarks = information.remarks;
                // $scope.details = information.details;
                // $scope.contact = information.contact;
                // $scope.year = information.year;

            }, function (errResponse) {
                alert(errResponse);
                // alert('error')
            });

        }
    }





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
