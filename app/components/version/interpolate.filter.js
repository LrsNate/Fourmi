'use strict';

angular
    .module('myApp.version')
    .filter('interpolate', ['version', function (version) {
        return (text) => {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);
