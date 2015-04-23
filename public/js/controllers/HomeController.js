var HomeController = MiaouMiam.controller('HomeController', function($scope, $http, toaster) {

    /**
     * Functions
     */

    $scope.loadCfg = function() {
        $scope.loadingCfg = true;
        $http.get('/config')
            .then(function onSuccess(response) {
                if(response && response.status === 200) {
                        $scope.config = response.data;
                }
                else {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: response.err.message || 'Error while loading the configuration.',
                        showCloseButton: true
                    });
                }
            })
            .catch(function onError(err) {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: err.message || 'Error while loading the configuration.',
                    showCloseButton: true
                });
            })
            .finally(function eitherWay() {
                $scope.loadingCfg = false;
            });
    }

    $scope.saveCfg = function(cfg) {
        $scope.savingCfg = true;
        $http.post('/config', {config: cfg})
            .then(function onSuccess(response) {
                if(response && response.status === 200) {
                    $scope.config = cfg;
                }
                else {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: response.err.message || 'Error while saving the configuration.',
                        showCloseButton: true
                    });
                }
            })
            .catch(function onError(err){
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: err.data || 'Error while saving the configuration.',
                    showCloseButton: true
                });
            })
            .finally(function eitherWay() {
                $scope.savingCfg = false;
            });
    }

    $scope.feed = function() {
        console.log('Feeding in progress');
        $scope.feeding = true;
        $http.post('/feed', {times: $scope.config.quantity})
            .then(function onSuccess(response){
                if(response && response.status === 200) {
                    console.log('Feeding terminated');
                }
                else {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: response.err.message || 'Error while feeding. Please check if the cat is safe.',
                        showCloseButton: true
                    });
                }
            })
            .catch(function onError(err){
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: err.data || 'Error while feeding. Please check if the cat is safe.',
                    showCloseButton: true
                });
            })
            .finally(function eitherWay() {
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
            friday: false,
            satursday: false,
            sunday: false
        };

        $scope.loadCfg();
    }
});