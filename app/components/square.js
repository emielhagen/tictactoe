import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SquareComponent extends Component {
  @tracked isO = false;
  @tracked isX = false;

  @action toggleO() {
    this.isO = true;
    let emptyBoxes = document.querySelectorAll('.square h2');
    let random = Math.floor(Math.random()*emptyBoxes.length);
    emptyBoxes[random].outerHTML = "<h3>X</h3>"
  }
}
