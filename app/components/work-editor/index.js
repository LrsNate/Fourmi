import angular from 'angular';
import 'angular-ui-bootstrap';
import SearchBox from '../search-box';
import WorksDao from '../../services/works-dao';
import WorkSearch from '../work-search';
import WorkEditorComponent from './work-editor.component';
import WorkSelectorComponent from './work-selector/work-selector.component';

export default angular.module('myApp.workEditor', [
  SearchBox.name,
  WorkSearch.name,
  WorksDao.name,
])
  .component(WorkEditorComponent.selector, WorkEditorComponent)
  .component(WorkSelectorComponent.selector, WorkSelectorComponent);
