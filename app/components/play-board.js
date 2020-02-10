import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set, get } from '@ember/object';

export default class PlayBoardComponent extends Component {
  @tracked userScore = 0;
  @tracked computerScore = 0;
  @tracked drawScore = 0;
  @tracked draw = false;
  @tracked gameOver = false;
  @tracked showDialogWithParent = false;
  @tracked winnerTitle = '';
  @tracked endingMessage = '';

  @action closeDialogWithParent(message){
    if(message === 'ok') {
      set(this, 'showDialogWithParent', false);
      resetScreen(this);
    } else {
      set(this, 'showDialogWithParent', false);
      location.reload();
    }
  }

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
    }

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
    Object.keys(layout).forEach(number => layout[number] === 'X' ? userPlayed.push(number) : null);

    if(computerOptions.length === 0) {
      if(checkWon(winCom, userPlayed)){
        set(this, 'userWon', true);
      } else {
        set(this, 'draw', true);
      }
    } else if(computerOptions.length === 9-(userPlayed.length*2-1)) {
      let compChose = computerOptions[Math.floor(Math.random()*computerOptions.length)];
      set(this, compChose, 'O');
      layout[compChose] = 'O';
      Object.keys(layout).forEach(number => layout[number] === 'O' ? computerPlayed.push(number) : null);
    }

    if(get(this, 'draw')){
      this.drawScore = this.drawScore += 1;
      set(this, 'draw', false);
      set(this, 'gameOver', true);
      set(this, 'winnerTitle', 'Draw');
      set(this, 'endingMessage', 'It is a draw!');
      set(this, 'showDialogWithParent', true);
    } else if(checkWon(winCom, userPlayed)) {
      this.userScore = this.userScore += 1;
      set(this, 'gameOver', true);
      set(this, 'winnerTitle', 'Winner: Player');
      set(this, 'endingMessage', 'Congratulations, you won!');
      set(this, 'showDialogWithParent', true);
    } else if(checkWon(winCom, computerPlayed)) {
      this.computerScore = this.computerScore += 1;
      set(this, 'gameOver', true)
      set(this, 'winnerTitle', 'Winner: Computer');
      set(this, 'endingMessage', 'Oh no, you lost!');
      set(this, 'showDialogWithParent', true);
    }

    if(get(this, 'gameOver')){
      userPlayed.length = 0;
      computerPlayed.length = 0;
      computerOptions.length = 0;
      // resetScreen(this);
      set(this, 'gameOver', false);
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
      return true
    }
  }
}

function resetScreen(boardComponent) {
  set(boardComponent, 'one', undefined);
  set(boardComponent, 'two', undefined);
  set(boardComponent, 'three', undefined);
  set(boardComponent, 'four', undefined);
  set(boardComponent, 'five', undefined);
  set(boardComponent, 'six', undefined);
  set(boardComponent, 'seven', undefined);
  set(boardComponent, 'eight', undefined);
  set(boardComponent, 'nine', undefined);
}
