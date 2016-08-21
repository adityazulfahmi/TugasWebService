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


module.controller('searchCtrl', ['$scope','$resource', function ($scope, $resource) {

    $scope.category="name";
    $scope.keyword="";


    var ShowAll = $resource('http://localhost:3000/people',
        {people : 'people'},
        {'get' : {method: 'GET', isArray :true}}
    );

    var FindByName = $resource('http://localhost:3000/people/name/:name',
        {name : '@userName'},
        {'get' : {method: 'GET', isArray :true}}
    );

    var FindBySex = $resource('http://localhost:3000/people/sex/:sex',
        {sex : '@sex'},
        {'get' : {method: 'GET', isArray :true}}
    );

    var FindByYear = $resource('http://localhost:3000/people/year/:year',
        {year : '@year'},
        {'get' : {method: 'GET', isArray :true}}
    );

    var FindByReward = $resource('http://localhost:3000/reward',
        {reward : '@reward'},
        {'get' : {method: 'GET', isArray :true}}
    );

    var showProfile = $resource('http://localhost:3000/people/:id',
        {id : '@id'},
        {'get' : {method: 'GET', isArray :false}}
    );

    $scope.ShowAll = function () {
                ShowAll.get().
                $promise.then(function (information) {
                    $scope.members =information;

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });
    }



    $scope.searchSubmit = function () {
        if($scope.category == "name"){

            if($scope.keyword !=null){
                FindByName.get({name :$scope.keyword}).
                $promise.then(function (information) {
                    $scope.members =information;

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });

            }
        }else if ($scope.category == "year"){
            if($scope.keyword !=null){
                FindByYear.get({year :$scope.keyword}).
                $promise.then(function (information) {
                    $scope.members =information;

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });
            }

        }else if ($scope.category == "reward"){
            if($scope.keyword !=null){
                FindByReward.get({reward :$scope.keyword}).
                $promise.then(function (information) {
                    $scope.members =information;
                    alert("reward search sent")

                }, function (errResponse) {
                    alert(errResponse);
                    // alert('error')
                });
            }

        }else if ($scope.category == "sex"){
            if($scope.keyword !=null){
                FindBySex.get({sex :$scope.keyword}).
                $promise.then(function (information) {
                    $scope.members =information;

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
        if($scope.keyword!=""){
            if($scope.category == "name"){

                if($scope.keyword !=null){
                    FindByName.get({name :$scope.keyword}).
                    $promise.then(function (information) {
                        $scope.members =information;

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });

                }
            }else if ($scope.category == "year"){
                if($scope.keyword !=null){
                    FindByYear.get({year :$scope.keyword}).
                    $promise.then(function (information) {
                        $scope.members =information;

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });
                }

            }else if ($scope.category == "reward"){
                if($scope.keyword !=null){
                    FindByReward.get({reward :$scope.keyword}).
                    $promise.then(function (information) {
                        $scope.members =information;
                        alert("reward search sent")

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });
                }

            }else if ($scope.category == "sex"){
                if($scope.keyword !=null){
                    FindBySex.get({sex :$scope.keyword}).
                    $promise.then(function (information) {
                        $scope.members =information;

                    }, function (errResponse) {
                        alert(errResponse);
                        // alert('error')
                    });
                }

            }
        }else{
            $scope.ShowAll();
        }
    });

    // $scope.getPersonbyName = function () {
    //
    // }
    //
    // $scope.getPersonbySex = function () {
    //     if($scope.name !=null){
    //         FindBySex.query().
    //         $promise.then(function (information) {
    //             $scope.members =information;
    //
    //         }, function (errResponse) {
    //             alert(errResponse);
    //             // alert('error')
    //         });
    //
    //     }
    // }
    //
    // $scope.getPersonbyYear = function () {
    //     if($scope.name !=null){
    //         FindByYear.query().
    //         $promise.then(function (information) {
    //             $scope.members =information;
    //
    //         }, function (errResponse) {
    //             alert(errResponse);
    //             // alert('error')
    //         });
    //
    //     }
    // }
    //
    // $scope.submit = function () {
    //     if($scope.username != null)
    //     {
    //
    //         //Team.get({userName: $scope.username, rrr: $scope.rrr}).
    //         Team.get({userName: $scope.username}).
    //         $promise.then(function (information) {
    //             $scope.username1 = information.username;
    //             $scope.nickname1 = information.nickname;
    //
    //         }, function (errResponse) {
    //             alert(errResponse);
    //             //fail
    //         });
    //     }
    //     else
    //     {
    //         Team.query().
    //         $promise.then(function (information) {
    //             $scope.members = information;
    //         },function (errResponse) {
    //             alert(errResponse);
    //         });
    //     }
    // }

}]);

// module.controller('profileCtrl', ['$scope','$resource', function ($scope, $resource) {
//     //var Team = $resource('http://localhost:3000/users/:userName/:rrr',
//     //  {userName : '@userName', rrr :'@w'},
//     // $scope.user ={};
//     // $scope.user.username ='';
//
//     var showProfile = $resource('http://localhost:3000/people/:id',
//         {id : '@id'},
//         {'get' : {method: 'GET', isArray :false}}
//     );
//
//     $scope.loadProfile = function () {
//         alert($scope.category );
//         alert($scope.keyword);
//         if($scope.category == "name"){
//
//             if($scope.keyword !=null){
//                 FindByName.get({name :$scope.keyword}).
//                 $promise.then(function (information) {
//                     $scope.members =information;
//
//                 }, function (errResponse) {
//                     alert(errResponse);
//                     // alert('error')
//                 });
//
//             }
//
//         }else if ($scope.category == "year"){
//             if($scope.keyword !=null){
//                 FindByYear.get({year :$scope.keyword}).
//                 $promise.then(function (information) {
//                     $scope.members =information;
//
//                 }, function (errResponse) {
//                     alert(errResponse);
//                     // alert('error')
//                 });
//             }
//
//         }else if ($scope.category == "reward"){
//             if($scope.keyword !=null){
//                 FindByReward.get({reward :$scope.keyword}).
//                 $promise.then(function (information) {
//                     $scope.members =information;
//                     alert("reward search sent")
//
//                 }, function (errResponse) {
//                     alert(errResponse);
//                     // alert('error')
//                 });
//             }
//
//         }else if ($scope.category == "sex"){
//             if($scope.keyword !=null){
//                 FindBySex.get({sex :$scope.keyword}).
//                 $promise.then(function (information) {
//                     $scope.members =information;
//
//                 }, function (errResponse) {
//                     alert(errResponse);
//                     // alert('error')
//                 });
//             }
//
//         }
//     }]);



// $scope.getPersonbyName = function () {
//     if($scope.name !=null){
//         FindByName.query().
//         $promise.then(function (information) {
//             $scope.members =information;
//
//             // $scope.name = information.name;
//             // $scope.dob = information.dob;
//             // $scope.pob = information.pob;
//             // $scope.hair = information.hair;
//             // $scope.eyes = information.eyes;
//             // $scope.height = information.height;
//             // $scope.photo = information.photo;
//             // $scope.weight = information.weight;
//             // $scope.sex = information.sex;
//             // $scope.race = information.race;
//             // $scope.sam = information.sam;
//             // $scope.reward = information.reward;
//             // $scope.remarks = information.remarks;
//             // $scope.details = information.details;
//             // $scope.contact = information.contact;
//             // $scope.year = information.year;
//
//         }, function (errResponse) {
//             alert(errResponse);
//             // alert('error')
//         });
//
//     }
// }

