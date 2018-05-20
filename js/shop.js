var app = angular.module('hanna', ['isteven-multi-select']);
app.controller('main', function($scope, $http, $sce) {
    console.log('sanity');
$scope.width = $(window).width();

    $scope.category = 'all';

    //Get shop data
    var grid = 'test';
    setData('shopItems', 'shop_item.php', function(){

        grid = $('.grid').imagesLoaded(function(){
            grid.isotope({
                itemSelector: '.grid-item',
                layoutMode: 'cellsByRow',
                cellsByRow: {
                    columnWidth: 400,
                    rowHaight: 800
                }
            });
        });

        setTimeout(function(){
            grid.isotope('layout');
        }, 100);
        setTimeout(function(){
            grid.isotope('layout');
        }, 1000);

        lightbox.option({});

        //Get shop categories
        setData('categories', 'shop_category.php', function(){
            $scope.allCount = 0;
            _.each($scope.categories, function(category){
                category.count = 0;
                _.each($scope.shopItems, function(item){
                    $scope.allCount++;
                    if(item.categories && item.categories.indexOf(category.name) >=0){
                        category.count++;
                        $scope.showCategories = true;
                    }
                });
            });
        });
    });

    //Change category
    $scope.setCategory = function(category){
console.log(category);
        if(category){
            $('.active').removeClass('active');
            $scope.category = category;
        }
    }

    $scope.showItem = function(item){
        return ($scope.category === 'all' || item.categories.indexOf($scope.category) >=0);
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

