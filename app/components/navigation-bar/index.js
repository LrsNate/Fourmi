import angular from 'angular';
import NavigationBarComponent from './navigation-bar.component';
import Version from '../version';

export default angular.module('myApp.navigationBar', [
  Version.name,
])
    .component('navigationBar', NavigationBarComponent);
