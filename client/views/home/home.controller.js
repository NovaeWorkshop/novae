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

    var architectureSection = document.getElementById('architecture-section');
    var architectureBackground = document.getElementById('architecture-background');

    var request = null;

    angular.element(window).bind('scroll', function (e) {

      // GALAXY HEADER
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


      // THINKING GALAXY
      var sectionTop = getPos(thinkingSection).y;

      if (document.body.scrollTop + screenHeight >= sectionTop
        && document.body.scrollTop <= sectionTop + screenHeight) {

        var thinkingHeight = parseInt(window.getComputedStyle(thinkingSection).getPropertyValue('height'));

        window.requestAnimationFrame(function () {

          var g = gauss(0, 10, (document.body.scrollTop - sectionTop) / 31);

          thinkingBackground.style.opacity = g * 9;

          thinkingBackground.style.webkitTransform = 'translate3d(0, ' + parseInt((document.body.scrollTop - sectionTop) * -0.11) + 'px, 0)'
            + ' scale3d(' + (1 + g * 0.9) + ', ' + (1 + g * 0.9) + ', 1.0)';

          request = null;
        });

      }


      // ARCHITECTURE STATION
      var architectureSectionTop = getPos(architectureSection).y;

      if (document.body.scrollTop + screenHeight >= architectureSectionTop
        && document.body.scrollTop <= architectureSectionTop + screenHeight) {

        var architectureHeight = parseInt(window.getComputedStyle(architectureSection).getPropertyValue('height'));

        window.requestAnimationFrame(function () {

          var g = gauss(0, 10, (document.body.scrollTop - architectureSectionTop) / 31);

          architectureBackground.style.opacity = g * 8;

          architectureBackground.style.webkitTransform = 'translate3d(0, ' + parseInt((document.body.scrollTop - architectureSectionTop) * -0.11) + 'px, 0)'
            + ' scale3d(' + (1 + g * 0.9) + ', ' + (1 + g * 0.9) + ', 1.0)';

          request = null;
        });

      }

    });

  });
