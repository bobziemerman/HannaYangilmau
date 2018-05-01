var app = angular.module('hanna', ['isteven-multi-select']);
app.controller('main', function($scope, $http) {
    console.log('sanity');
$scope.width = $(window).width();

    var grid = 'test';

    //Get gallery data
    $http.get("db/gallery.php")
    .then(function (response) {
        $scope.gallery = response.data;

        //Initialize masonry layour
        var grid = $('.grid').imagesLoaded(function(){
            grid.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
        });

        setTimeout(function(){
            grid.isotope('layout');
        }, 100);

    });

});

