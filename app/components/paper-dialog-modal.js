import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PaperDialogModalComponent extends Component {
  @action closeDialogWithParent(message){
    if(message === 'ok') {
      this['showDialogWithParent'] = false;
      this.args.resetScreen()
    } else {
      this['showDialogWithParent'] = false;
      location.reload();
    }
  }
}
