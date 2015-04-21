app = angular.module('ovts', []);

app.directive("ovtsSlider", function($document, $timeout) {
  return {
    restrict: "A",
    scope: {
      model: "=",
    },
    replace: true,
    template: "<div class='slider'><p class='slider-label'>{{label}}</p><p class='slider-value'>{{valuePrefix}}{{displayValue}}{{valueSuffix}}</p><div class='slider-container'><div class='slider-bar'><div class='slider-bar-highlight' ng-style='highlightStyle'></div></div><div class='slider-bar-stub'></div><div class='slider-handle' ng-mousedown='engageHandle($event)' ng-style='handleStyle'></div></div></div>",
    link: function(scope, element, attrs) {
      var moveHandle, percentage, setPercentage, sliderHandleWidth;

      var options = scope.$eval(attrs.ovtsSliderOptions) || {}
      scope.step = options.step || 5;
      scope.min = options.min || 0;
      scope.max = options.max || 100;
      scope.label = options.label || '';
      scope.valuePrefix = options.valuePrefix || '';
      scope.valueSuffix = options.valueSuffix || '';

      percentage = 0;
      scope.displayValue = scope.model;
      sliderHandleWidth = element[0].querySelector('.slider-handle').clientWidth;

      if (scope.model == null)
        scope.model = 0;

      moveHandle = function() {
        return scope.$evalAsync(function() {
          scope.highlightStyle = { 'right': (100 - percentage * 100) + "%" };
          return scope.handleStyle = { 'left': (percentage * 100) + "%" };
        });
      };

      setPercentage = function() {
        return percentage = scope.model / scope.max;
      };

      scope.engageHandle = function(event) {
        var basePercentage, basePosition, mouseMove, mouseUp;
        event.preventDefault();
        basePosition = event.screenX;
        basePercentage = percentage;

        mouseMove = function(event) {
          percentage = basePercentage + (event.screenX - basePosition) / (element.prop("clientWidth") - sliderHandleWidth);
          if (percentage < 0)
            percentage = 0;

          if (percentage > 1)
            percentage = 1;

          scope.displayValue = Math.round(scope.max * percentage / scope.step) * scope.step;
          return moveHandle();
        };

        mouseUp = function() {
          $document.off("mousemove", mouseMove);
          $document.off("mouseup", mouseUp);
          scope.model = scope.displayValue;
          setPercentage();
          return moveHandle();
        };

        $document.on("mousemove", mouseMove);
        $document.on("mouseup", mouseUp);
      };

      setPercentage();
      moveHandle();

      return scope.$watch('model', function(newValue, oldValue, scope) {
        scope.displayValue = newValue;
        setPercentage();
        return moveHandle();
      });
    }
  };
});
