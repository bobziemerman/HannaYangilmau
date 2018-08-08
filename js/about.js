var app = angular.module('hanna', ['isteven-multi-select']);
app.controller('main', function($scope, $http, $sce) {
    console.log('sanity');
$scope.width = $(window).width();

    //Get about data
    setData('about', 'about.php', function(){console.log($scope.about);});

    /************** Helper Functions ***************/

    function setData(field, phpPage, thenFunction){
        $http.get('db/'+phpPage)
        .then(function (response) {
            $scope[field] = response.data;
            if(thenFunction){
                thenFunction();
            }
        });
    }

});

