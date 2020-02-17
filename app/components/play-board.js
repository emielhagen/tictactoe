import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action, get, set } from '@ember/object';

export default class PlayBoardComponent extends Component {
  @tracked dialogModal = false
  @tracked gameOver = false
  @tracked userWon = false
  @tracked computerWon = false
  @tracked userScore = 0
  @tracked computerScore = 0
  @tracked drawScore = 0
  @tracked grid = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

  @action userSelect(number) {
    let userPlayed = []
    if(this[number] === undefined ){
      set(this, number, 'X')
      this.grid.forEach(number => this[number] === 'X' ? userPlayed.push(number) : null)
      if(checkWinner(this, userPlayed)) {
        this.gameOver = true
        this.userWon = true
        this.userScore += 1
      } else {
        computerSelect(this, this.grid);
      }
    }
    if(this.gameOver) {
      this.dialogModal = true
    }
  }

  @action resetScreen() {
    this.userWon = false
    this.computerWon = false
    this.dialogModal = false
    this.gameOver = false
    this.grid.forEach(element => set(this, element, undefined))
  }
}

function computerSelect(gameComponent, grid) {
  let computerPlayed = []
  let options = []
  grid.forEach(function(e){
    if(gameComponent[e] === undefined){
      options.push(e);
    }
  })
  if(options.length === 0) {
    gameComponent.gameOver = true
    gameComponent.drawScore += 1
  } else {
    const randomElement = options[Math.floor(Math.random() * options.length)];
    set(gameComponent, randomElement, 'O')
    grid.forEach(number => gameComponent[number] === 'O' ? computerPlayed.push(number) : null)
    if(checkWinner(gameComponent, computerPlayed)){
      gameComponent.gameOver = true
      gameComponent.computerWon = true
      gameComponent.computerScore += 1
    }
  }
}

function checkWinner(gameComponent, playedNumbers) {
  let winCombi = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  let inDices = indicesForPlayedNumbers(playedNumbers)

  for(let a=0; a<winCombi.length; a++){
    let count = 0;
    for(let b=0; b<inDices.length; b++){
      if(winCombi[a].includes(inDices[b])){
        count += 1
      }
    }
    if(count === 3) {
      return true
    }
  }
}

function indicesForPlayedNumbers (playedNumbers){
  let indices = []
  let grid = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  playedNumbers.map(function(number) {
    indices.push(grid.indexOf(number))
  })
  return indices
}
