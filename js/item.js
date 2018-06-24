var app = angular.module('hanna', ['isteven-multi-select']);
app.controller('main', function($scope, $http, $sce) {
    console.log('sanity');
$scope.width = $(window).width();

    //Get id
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    $scope.id = url.searchParams.get("id");

    //Get shop data
    if($scope.id){
        setData('item', 'shop_item.php?id='+$scope.id, function(){
            if($scope.item && $scope.item.length){
                $scope.item = $scope.item[0];
            }
console.log($scope.item);

            lightbox.option({});

            //Create paypal button
            renderButton();
        });
    }

    $scope.makeId = makeId;
    function makeId(item){
        console.log(item);
        var id =  item.display_name+item.dollar_cost;
        id = id.replace(/[\s\.#]/g, '');
        console.log(id);
        return id;
    }

    function renderButton(){
        if($scope.item){
            paypal.Button.render({
                env: 'sandbox', //TODO switch to 'production'
                client: {
                    sandbox: 'AQxSau5bKdkOlwwnYvQoVfIWo-KQsXvqEGXOe908C0OIslAfkf1Zm3OgV8tQ2O5TNQiTw44wL-5j-k-Y',
                    production: 'ATSTFWdEhVBdyPhlUDj8uG7LYmJSZ5AHECkn2z7V7TZFYbO0RQj7X2otacoLVkY_oCDriuXvSS2Bq-kZ'
                },
                commit: true,
                style: {
                    color: 'blue',
                    shape: 'rect',
                    size: 'medium',
                    tagline: false
                },
                payment: function(data, actions){
                    console.log('payment');
                    console.log(data);
                    console.log(actions);

                    return actions.payment.create({
                        payment: {
                            transactions: [{
                                amount: {total: $scope.item.dollar_cost, currency: 'USD'},
                                description: $scope.item.display_name
                            }]
                        }
                    });
                },
                onAuthorize: function(data, actions){
                    console.log('onauth');
                    console.log(data);
                    console.log(actions);

                    return actions.payment.execute().then(function(payment){
                        console.log('payment complete');
                        console.log(payment);
                        //TODO confirmation page
                    });
                },
                onCancel: function(data, actions){},
                onError: function(err){
                    console.log('err');
                    console.log(err);
                    //TODO show error popup
                }
            }, '#item-button');
        };
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

