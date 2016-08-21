/**
 * Created by ajou on 8/19/2016.
 */
var module = angular.module('missingApp', ['ngFileUpload', 'ngResource']);

module.controller('addCtrl', ['$scope', '$http' ,'$window' ,'Upload',  function ($scope, $http, $window, Upload) {

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

        var fixedDOB = $scope.dob.split("T");
        alert(fixedDOB[0]);
        Upload.upload({
                url : 'http://localhost:3000/add',
                method : 'POST',
                data : {
                    photo    : $scope.file,
                    name    : $scope.name,
                    dob     : fixedDOB[0],
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


module.controller('CommentCtrl', ['$scope', '$http' ,'$window', function ($scope, $http, $window) {
    // $scope.user ={};
    // $scope.user.username ='';
    $scope.id = $window.location.hash.substring(1);
    alert($scope.id);
    $scope.submitComment = function () {

        alert("send comment");
        console.log("hore");

        $http({
            method : 'POST',
            url : 'http://localhost:3000/addComment',
            data : {
                id   : $scope.id,
                email     : $scope.email,
                comment    : $scope.comment,
                date : new Date()
            }
        })
            .success(function(data, status, headers, config) {
                if( data ) {
                    alert(data);
                    console.log("hore2");
                }
                else {
                }
            })
            .error(function(data, status, headers, config) {
                console.log(status);
            });
    };
}]);

module.controller('profileCtrl', ['$scope', '$http','$window' ,'$resource' , function ($scope, $http, $window, $resource) {
    // $scope.user ={};
    // $scope.user.username ='';
   $scope.id = $window.location.hash.substring(1);
    alert($scope.id);

    var ShowProfile = $resource('http://localhost:3000/people/:id',
        {id : 'id'},
        {'get' : {method: 'GET', isArray :false}}
    );

    ShowProfile.get({id :$scope.id}).
    $promise.then(function (information) {
        $scope.person   =information;
        alert(JSON.stringify($scope.person));

    }, function (errResponse) {
        alert(errResponse);
        // alert('error')
    });

}]);


module.controller('searchCtrl', ['$scope','$resource','$window' , function ($scope, $resource, $window) {

    $scope.category = "name";
    $scope.keyword = "";

    var ShowAll = $resource('http://localhost:3000/people',
        {people: 'people'},
        {'get': {method: 'GET', isArray: true}}
    );

    var FindByName = $resource('http://localhost:3000/people/name/:name',
        {name: '@userName'},
        {'get': {method: 'GET', isArray: true}}
    );

    var FindBySex = $resource('http://localhost:3000/people/sex/:sex',
        {sex: '@sex'},
        {'get': {method: 'GET', isArray: true}}
    );

    var FindByYear = $resource('http://localhost:3000/people/year/:year',
        {year: '@year'},
        {'get': {method: 'GET', isArray: true}}
    );

    var FindByReward = $resource('http://localhost:3000/reward',
        {reward: '@reward'},
        {'get': {method: 'GET', isArray: true}}
    );

    var showProfile = $resource('http://localhost:3000/people/:id',
        {id: '@id'},
        {'get': {method: 'GET', isArray: false}}
    );


    $scope.ShowAll = function () {
        ShowAll.get().$promise.then(function (information) {
            $scope.members = information;

        }, function (errResponse) {
            alert(errResponse);
            // alert('error')
        });
    }

    $scope.loadProfile = function (id) {
        // serviceId.set(id);
        alert(id);
        $window.location.href = 'profile.html' + '#' + id;

    }


    $scope.searchSubmit = function () {
        if ($scope.category == "name") {

            if ($scope.keyword != null) {
                FindByName.get({name: $scope.keyword}).$promise.then(function (information) {
                    $scope.members = information;

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });

            }
        } else if ($scope.category == "year") {
            if ($scope.keyword != null) {
                FindByYear.get({year: $scope.keyword}).$promise.then(function (information) {
                    $scope.members = information;

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });
            }

        } else if ($scope.category == "reward") {
            if ($scope.keyword != null) {
                FindByReward.get({reward: $scope.keyword}).$promise.then(function (information) {
                    $scope.members = information;
                    alert("reward search sent")

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });
            }

        } else if ($scope.category == "sex") {
            if ($scope.keyword != null) {
                FindBySex.get({sex: $scope.keyword}).$promise.then(function (information) {
                    $scope.members = information;

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });
            }

        }
    };

    $scope.$watch('category', function () {
        $scope.keyword = "";
    });

    $scope.$watch('keyword', function () {
        if ($scope.keyword != "" && $scope.keyword!= null) {
            if ($scope.category == "name") {

                if ($scope.keyword != null) {
                    FindByName.get({name: $scope.keyword}).$promise.then(function (information) {
                        $scope.members = information;

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });

                }
            } else if ($scope.category == "year") {
                if ($scope.keyword != null) {
                    FindByYear.get({year: $scope.keyword}).$promise.then(function (information) {
                        $scope.members = information;

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });
                }

            } else if ($scope.category == "reward") {
                if ($scope.keyword != null) {
                    FindByReward.get({reward: $scope.keyword}).$promise.then(function (information) {
                        $scope.members = information;
                        alert("reward search sent")

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });
                }

            } else if ($scope.category == "sex") {
                if ($scope.keyword != null) {
                    FindBySex.get({sex: $scope.keyword}).$promise.then(function (information) {
                        $scope.members = information;

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });
                }

            }
        } else {
            $scope.ShowAll();
        }
    });
}]);

module.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
