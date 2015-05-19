'use strict';

angular.module('novae')
  .controller('HomeCtrl', function () {
    var vm = this;
    var galaxy = document.getElementsByClassName('galaxy-layer')[0];

    var request = null;

    angular.element(window).bind('scroll', function (e) {

      if (document.body.scrollTop > parseInt(window.getComputedStyle(galaxy).getPropertyValue('height')))
        return;

      if (request)
        window.cancelAnimationFrame(request);

      request = window.requestAnimationFrame(function () {
        galaxy.style.webkitTransform = 'translate3d(0, ' + parseInt(document.body.scrollTop * 0.4) + 'px, 0)';
        request = null;
      });

    });

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

  });
