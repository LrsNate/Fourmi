export default {
  selector: 'workEditor',
  templateUrl: 'components/work-editor/work-editor.template.html',
  bindings: {
    work: '=',
  },
  controller: class {

    constructor(worksDao) {
      this.worksDao = worksDao;
      this.editedVice = '';

      if (this.work.originId) {
        worksDao.getWork(this.work.originId).then((work) => {
          this.originWork = work;
          // noinspection JSUnusedGlobalSymbols
          this.originReference = `${work.author}: ${work.reference}`;
        });
      }
    }

    static get $inject() {
      return ['worksDao'];
    }

    addVice() {
      this.editedVice = this.editedVice.trim();
      if (!this.editedVice || !this.editedVice.length) return;
      this.work.vices.push(this.editedVice);
      this.editedVice = '';
    }

    deleteVice(index) {
      this.work.vices.splice(index, 1);
    }
  },
};
