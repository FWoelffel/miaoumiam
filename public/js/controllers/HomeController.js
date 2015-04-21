var HomeController = MiaouMiam.controller('HomeController', function($scope, $http) {

    /**
     * Functions
     */

    $scope.loadCfg = function() {
        $scope.loadingCfg = true;
        $http.get('/config')
            .then(function onSuccess(response) {
                if(response.status === 200) {
                    $scope.config = response.data;
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err){
                console.log('Error : ' + response.data);
            })
            .finally(function eitherWay(){
                $scope.loadingCfg = false;
            });
    }

    $scope.saveCfg = function(cfg) {
        $scope.savingCfg = true;
        $http.post('/config', {config: cfg})
            .then(function onSuccess(response) {
                if(response.status === 200) {
                    $scope.config = cfg;
                }
                else {
                    console.log('Error : ' + response.data);
                }
            })
            .catch(function onError(err){
                console.log('Error : ' + response.data);
            })
            .finally(function eitherWay(){
                $scope.savingCfg = false;
            });
    }

    $scope.feed = function() {
        console.log('Feeding in progress');
        $scope.feeding = true;
        $http.post('/feed', {times: $scope.config.quantity})
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

    $scope.normalizeTime = function() {
        $scope.date.hours = ($scope.time.getHours() < 10 ? '0' + $scope.time.getHours() : $scope.time.getHours());
        $scope.date.minutes = ($scope.time.getMinutes() < 10 ? '0' + $scope.time.getMinutes() : $scope.time.getMinutes());
    }

    $scope.addSchedule = function() {
        var config = angular.copy($scope.config);
        config.scheduled.push({quantity: $scope.sliderValue, date: angular.copy($scope.date)});
        $scope.saveCfg(config);
    }

    $scope.removeSchedule = function(idx) {
        var config = angular.copy($scope.config);
        config.scheduled.splice(idx, 1);
        $scope.saveCfg(config);
    }

    /**
     * Initialization
     */

    {
        $scope.feeding = false;
        $scope.loadingCfg = false;
        $scope.savingCfg = false;
        $scope.sliderValue = 10;

        // Init default date
        $scope.time = new Date();
        $scope.date = {
            hours: ($scope.time.getHours() < 10 ? '0' + $scope.time.getHours() : $scope.time.getHours()),
            minutes: ($scope.time.getMinutes() < 10 ? '0' + $scope.time.getMinutes() : $scope.time.getMinutes()),
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            satursday: false,
            sunday: false
        };

        $scope.loadCfg();
    }
});