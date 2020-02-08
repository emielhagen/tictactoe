import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SquareComponent extends Component {
  @tracked isO = false;

  @action toggleSize() {
    this.isO = !this.isO;
  }
}
