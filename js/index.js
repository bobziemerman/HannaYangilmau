var app = angular.module('harmonicIntervals', ['isteven-multi-select']);
app.controller('main', function($scope) {
    console.log('sanity');

    $scope.winWidth = $(window).width();
    $scope.docWidth = $(document).width();

});

