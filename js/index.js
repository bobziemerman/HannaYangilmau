var app = angular.module('hanna', ['isteven-multi-select']);
app.controller('main', function($scope, $http, $sce) {
    console.log('sanity');
$scope.width = $(window).width();

    //Get landing data
    setData('landingText', 'landing.php', function(){
        $scope.landingText[0].text = $sce.trustAsHtml($scope.landingText[0].text);
    });

    //Get gallery data
    var grid = 'test';
    setData('gallery', 'gallery.php', function(){

        //Get hero image
        _.each($scope.gallery, function(item){
            if(item.main_image === '1'){
                $scope.main = item;
            }
        });

        //Initialize masonry layout
        grid = $('.grid').imagesLoaded(function(){
            grid.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
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

    $scope.toGallery = function(){
        $('html, body').animate({
            scrollTop: ($('.gallery').offset().top)
        },800);
    }



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

