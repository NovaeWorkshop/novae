'use strict';

angular.module('novae')
  .controller('HomeCtrl', function () {
    var vm = this;
    var galaxy = document.getElementsByClassName('galaxy-layer')[0];
    var galaxyBlurred = document.getElementsByClassName('galaxy-blurred-layer')[0];

    var request = null;

    angular.element(window).bind('scroll', function (e) {
      var galaxyHeight = parseInt(window.getComputedStyle(galaxy).getPropertyValue('height'));

      if (document.body.scrollTop > galaxyHeight)
        return;

      if (request)
        window.cancelAnimationFrame(request);

      request = window.requestAnimationFrame(function () {
        galaxy.style.webkitTransform = 'translate3d(0, ' + parseInt(document.body.scrollTop * 0.4) + 'px, 0)';
        galaxyBlurred.style.webkitTransform = 'translate3d(0, ' + parseInt(document.body.scrollTop * 0.4) + 'px, 0)';
        galaxy.style.opacity = (galaxyHeight * 2 / 3 - document.body.scrollTop) / (galaxyHeight * 2 / 3);

        request = null;
      });

    });

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

  });
