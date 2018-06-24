var app = angular.module('hanna', ['isteven-multi-select']);
app.controller('main', function($scope, $http, $sce) {
    console.log('sanity');
$scope.width = $(window).width();

    $scope.reverseSort = false;
    $scope.category = 'all';

    //Get shop data
    var grid = 'test';
    setData('shopItems', 'shop_item.php', function(){

        lightbox.option({});

        //Get shop categories
        setData('categories', 'shop_category.php', function(){
            _.each($scope.categories, function(category){
                category.count = 0;
                _.each($scope.shopItems, function(item){
                    if(item.categories && item.categories.indexOf(category.name) >=0){
                        category.count++;
                        $scope.showCategories = true;
                    }
                });
            });
        });

        //Default sort
        sortBy('display_name');
    });

    //Change category
    $scope.setCategory = function(event, category){
        if(category){
            $('.active--category').removeClass('active--category');
            $(event.currentTarget).addClass('active--category');
            $scope.category = category;
        }
    }

    $scope.showItem = function(item){
        return ($scope.category === 'all' || item.categories.indexOf($scope.category) >=0);
    }

    //Sort orders
    $scope.sortBy = sortBy;
    function sortBy(string){
        //Change sort order if you click twice
        if($scope.sortType === string){
           $scope.reverseSort = !$scope.reverseSort;
        } else if(string && (string === 'display_name' || string === 'dollar_cost' || string === 'categories')){
            $('.active--sort').removeClass('active--sort');
            $('.sort--'+string).addClass('active--sort');
            $scope.reverseSort = false;
            $scope.sortType = string;
        }
    };



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

