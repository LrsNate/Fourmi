'use strict';

angular
    .module('myApp.searchBox')
    .component('searchBox', {
    templateUrl: 'components/search-box/search-box.template.html',
    bindings: {
        filters: '=',
        phraseFilter: '=',
        onUpdate: '&'
    },
    controller: ['$timeout', 'worksDao', function ($timeout) {

        this.statusMessage = 'Préparation de l\'index de recherche...';

        this.deleteFilter = (index) => {
            this.filters.splice(index, 1);
            this.onUpdate();
        };

        this.addFilter = () => {
            this.filters.push({});
        };

        this.reset = () => {
            this.filters = [];
            this.phraseFilter = '';
            $timeout(() => {
                this.onUpdate();
            });
        };
    }]
});