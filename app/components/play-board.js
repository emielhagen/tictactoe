import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set, get } from '@ember/object';


export default class PlayBoardComponent extends Component {
  @tracked userScore = 0;
  @tracked computerScore = 0;
  @tracked drawScore = 0;
  @tracked draw = false;

  @action markX(number) {
    let userPlayed = [];
    let computerPlayed = [];
    let computerOptions = [];

    let winCom = [
      ['one', 'four', 'seven'],
      ['two', 'five', 'eight'],
      ['three', 'six', 'nine'],
      ['one', 'two', 'three'],
      ['four', 'five', 'six'],
      ['seven', 'eight', 'nine'],
      ['one', 'five', 'nine'],
      ['three', 'five', 'seven']
    ];

    if(get(this, number) === undefined ){
      set(this, number, 'X');
    };

    let layout = { one: get(this, 'one'),
                   two: get(this, 'two'),
                   three: get(this, 'three'),
                   four: get(this, 'four'),
                   five: get(this, 'five'),
                   six: get(this, 'six'),
                   seven: get(this, 'seven'),
                   eight: get(this, 'eight'),
                   nine: get(this, 'nine')
                 };

    Object.keys(layout).forEach(number => layout[number] === undefined ? computerOptions.push(number) : null);
    if(computerOptions.length === 0) {
      set(this, 'draw', true)
    } else {
      set(this, computerOptions[Math.floor(Math.random()*computerOptions.length)], 'O');
    }
    Object.keys(layout).forEach(number => layout[number] === 'O' ? computerPlayed.push(number) : null);
    Object.keys(layout).forEach(number => layout[number] === 'X' ? userPlayed.push(number) : null);

    if(get(this, 'draw')){
      alert('DRAW');
      this.drawScore = this.drawScore += 1;
      set(this, 'draw', false);
      userPlayed.length = 0;
      computerPlayed.length = 0;
      computerOptions.length = 0;
      resetScreen(this);
    } else if(checkWon(winCom, userPlayed)) {
      alert('yes, you got it');
      this.userScore = this.userScore += 1;
      userPlayed.length = 0;
      computerPlayed.length = 0;
      computerOptions.length = 0;
      resetScreen(this);
    } else if(checkWon(winCom, computerPlayed)) {
      debugger;
      alert('Oops, you lost!');
      this.computerScore = this.computerScore += 1;
      userPlayed.length = 0;
      computerPlayed.length = 0;
      computerOptions.length = 0;
      resetScreen(this);
    }
  }

}


function checkWon(winCombi, playedNumbers) {
  for(let a=0; a<winCombi.length; a++){
    let count = 0;
    for(let b=0; b<playedNumbers.length; b++){
      if(winCombi[a].includes(playedNumbers[b])){
        count += 1;
      }
    }
    if(count === 3) {
      return true;
    }
  }
}

function resetScreen(board) {
  set(board, 'one', undefined);
  set(board, 'two', undefined);
  set(board, 'three', undefined);
  set(board, 'four', undefined);
  set(board, 'five', undefined);
  set(board, 'six', undefined);
  set(board, 'seven', undefined);
  set(board, 'eight', undefined);
  set(board, 'nine', undefined);
}
