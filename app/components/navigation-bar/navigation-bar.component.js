import template from './navigation-bar.template.pug';

export default {
  template,
  controller: class {

    constructor($scope, $location) {
      this.$location = $location;
      this.pageTitles = {
        add: 'Ajouter une nouvelle oeuvre',
        changelog: 'Changelog',
        edit: 'Éditer une oeuvre',
        search: 'Rechercher une oeuvre',
        settings: 'Paramètres',
      };

      $scope.$watch(() => $location.path(), (route) => {
        const words = route.split('/');
        this.route = words[1];
      });
    }

    static get $inject() {
      return ['$scope', '$location'];
    }

    isSecondaryRoute() {
      return this.route !== 'search';
    }

    goBack() {
      this.$location.path('/search');
    }
  },
};
