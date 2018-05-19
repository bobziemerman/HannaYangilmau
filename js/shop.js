var app = angular.module('hanna', ['isteven-multi-select']);
app.controller('main', function($scope, $http, $sce) {
    console.log('sanity');
$scope.width = $(window).width();

    //Get shop data
    var grid = 'test';
    setData('shopItems', 'shop.php', function(){

        //Initialize masonry layout
        grid = $('.grid').imagesLoaded(function(){
            grid.isotope({
                itemSelector: '.grid-item',
                layoutMode: 'cellsByRow',
                cellsByRow: {
                    columnWidth: 400
                }
            });
        });

        //Spread grid
        setTimeout(function(){
            grid.isotope('layout');
        }, 100);
        //backup spread
        setTimeout(function(){
            grid.isotope('layout');
        }, 1000);

        //Reinit lightbox
        lightbox.option({});
    });

    //Change category
    $scope.setCategory = function(category){
        if(category){
            if(category === 'all') {
                delete $scope.category;
                grid.isotope({filter:'*'});
            } else {
                $scope.category = category;
                grid.isotope({filter:'.'+category});
            }
        }
    }

    //Category helpers
    $scope.book = function(categories){ return categories.includes('book') };
    $scope.concept = function(categories){ return categories.includes('concept') };
    $scope.illustration = function(categories){ return categories.includes('illustration') };



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

