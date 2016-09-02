'use strict';

angular.module('myApp.search')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            template: '<search></search>'
        });
    }])

    .component('search', {
        controller: ['worksDao', 'searchHelper', function (worksDao, searchHelper) {

            this.fullWorks = [];
            this.works = [];
            this.filters = [];
            this.phraseFilter = '';
            this.statusMessage = 'Chargement des épigrammes...';
            this.selectedWork = null;

            worksDao.getWorks().then((function (works) {
                this.fullWorks = works;
                this.works = works;
                this.statusMessage = 'Aucune épigramme n\'a pu être trouvée avec ces critères';
            }).bind(this));

            this.setSelectedWork = function (work) {
                this.selectedWork = work;
            };

            this.filterByReference = function (work) {
                this.filters = [
                    {field: 'work', matcher: 'imitates', term: work.reference}
                ];
                this.refreshFilters();
            };

            this.refreshFilters = function () {
                searchHelper.applyFilters(this.filters, this.fullWorks)
                    .then((function (works) {
                        this.works = works;
                    }).bind(this));
            };
        }],
        templateUrl: 'routes/search/search.template.html'
    });