var HomeController = MiaouMiam.controller('HomeController', function($scope, $http) {

    $scope.feeding = false;


    $scope.feed = function() {
        console.log('Feeding in progress');
        $scope.feeding = true;
        $http.get('/feed')
            .then(function onSuccess(response){
                if(response.status === 200) {
                    console.log('Feeding terminated');
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err){})
            .finally(function eitherWay(){
                $scope.feeding = false;
            });
        //$http.get('/feed');
    }

});