var HomeController = MiaouMiam.controller('HomeController', function($scope, $http) {

    $scope.feeding = false;
    $scope.scheduling = false;

    var d = new Date();
    $scope.date = {
        hours: d.getHours(),
        minutes: d.getMinutes(),
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        satursday: false,
        sunday: false
    }

    $scope.feed = function() {
        console.log('Feeding in progress');
        $scope.feeding = true;
        $http.post('/feed', {times: $scope.slider.val})
            .then(function onSuccess(response){
                if(response.status === 200) {
                    console.log('Feeding terminated');
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err){
                console.log('Error : ' + response.data);
            })
            .finally(function eitherWay(){
                $scope.feeding = false;
            });
    }

    $scope.updateTime = function() {
        $scope.date.hours = $scope.time.getHours();
        $scope.date.minutes = $scope.time.getMinutes();
    }

    $scope.schedule = function() {
        $scope.scheduling = true;
        console.log('Scheduling');
        $http.post('/config/schedule', {date: $scope.date})
            .then(function onSuccess(response) {
                if (response.status === 200) {
                    console.log('Scheduled');
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err) {
                console.log('Error : ' + response.data);
            })
            .finally(function eitherWay() {
                $scope.scheduling = false;
            });
    }
});