import template from './navigation-bar.template.pug';

export default {
  template,
  controller: class {

    constructor($scope, $location) {
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

    isOtherRoute() {
      return this.route !== 'search' &&
        this.route !== 'changelog' &&
        this.route !== 'add';
    }
  },
};
