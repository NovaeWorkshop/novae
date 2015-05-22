'use strict';

angular.module('novae')
  .controller('HomeCtrl', function () {

    // Shitty function
    function getPos (el) {
      for (var lx=0, ly=0;
       el != null;
       lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
      return {x: lx,y: ly};
    }

    function gauss (mu, sigma, x) {
      return (1 / (Math.sqrt(2 * Math.PI) * sigma)) * Math.exp(-((x - mu) * (x - mu)) / (2 * sigma * sigma));
    }

    var galaxy = document.getElementsByClassName('galaxy-layer')[0];
    var galaxyBlurred = document.getElementsByClassName('galaxy-blurred-layer')[0];

    var thinkingSection = document.getElementById('thinking-section');
    var thinkingBackground = document.getElementById('thinking-background');

    var request = null;

    angular.element(window).bind('scroll', function (e) {
      var galaxyHeight = parseInt(window.getComputedStyle(galaxy).getPropertyValue('height'));

      var screenHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

      if (document.body.scrollTop <= galaxyHeight) {
        if (request)
          window.cancelAnimationFrame(request);

        request = window.requestAnimationFrame(function () {
          galaxy.style.webkitTransform = 'translate3d(0, ' + parseInt(document.body.scrollTop * 0.4) + 'px, 0)';
          galaxyBlurred.style.webkitTransform = 'translate3d(0, ' + parseInt(document.body.scrollTop * 0.4) + 'px, 0)';
          galaxy.style.opacity = (galaxyHeight * 2 / 3 - document.body.scrollTop) / (galaxyHeight * 2 / 3);

          request = null;
        });
      }


      var sectionTop = getPos(thinkingSection).y;

      if (document.body.scrollTop + screenHeight >= sectionTop
        && document.body.scrollTop <= sectionTop + screenHeight) {

        var thinkingHeight = parseInt(window.getComputedStyle(thinkingSection).getPropertyValue('height'));

        window.requestAnimationFrame(function () {
          thinkingBackground.style.webkitTransform = 'translate3d(0, ' + parseInt((document.body.scrollTop - sectionTop) * -0.11) + 'px, 0)';

          var opacity = gauss(0, 10, (document.body.scrollTop - sectionTop) / 31);

          thinkingBackground.style.opacity = opacity * 9;

          request = null;
        });

      }

    });

  });
