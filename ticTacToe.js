class TicTacToe {
  constructor() {
    this.board = [['', '|', '', '|', ''], ['------------------'], ['', '|', '', '|', ''], ['------------------'], ['', '|', '', '|', '']];
    this.players = ['Player Two', 'Player One'];
    this.moves = { 'top': 0, 'middle': 2, 'bottom': 4, 'left': 0, 'right': 4 };
    this.turnNumber = 1;
    this.promptMove();
  }

  checkWin(sym) {
    // check horizontal lines
    for (var h = 0; h <= 4; h+=2) {
      if (this.board[h].join('') === `${sym}|${sym}|${sym}`) {
        return true;
      }
    }
    // check vertical lines
    let vertical;
    for (var v = 0; v <= 4; v+=2) {
      vertical = [];
      for (var a = 0; a <= 4; a+=2) {
        vertical.push(this.board[a][v]);
      }
      if (vertical.join('') === `${sym}${sym}${sym}`) {
        return true;
      }
    }
    // check diagonal lines
    let topLeft = [this.board[0][0], this.board[2][2], this.board[4][4]];
    let topRight = [this.board[0][4], this.board[2][2], this.board[4][0]];
    if (topLeft.join('') === `${sym}${sym}${sym}` || topRight.join('') === `${sym}${sym}${sym}`) {
      return true;
    }

    return false;
  }

  endGame(playerName) {
    console.log(this.board);
    console.log(`${playerName} wins!`)
    this.resetBoard();
  }

  move(location) {
    let [ vert, horiz ] = location.split(' ');
    let playerTurn = this.players[this.turnNumber % 2];
    let playerSymbol = playerTurn === 'Player One' ? 'O' : 'X';
    if (!this.board[this.moves[vert]][this.moves[horiz]]) {
      this.board[this.moves[vert]][this.moves[horiz]] = playerSymbol;
      this.turnNumber++;
      this.checkWin(playerSymbol) ? this.endGame(playerTurn) : this.promptMove();
    } else {
      this.tryAgainMessage();
      this.promptMove();
    }
  }

  tryAgainMessage() {
    console.log(`That's not a valid move, dummy.`);
  }

  promptMove() {
    let playerTurn = this.players[this.turnNumber%2];
    console.log(this.board);
    console.log(`Turn number ${this.turnNumber}. ${playerTurn}'s turn! Use game.move('location') to issue your next move. Ex. game.move('middle right')`);
  }

  resetBoard() {
    this.board = [['', '|', '', '|', ''], ['-', '-', '-'], ['', '|', '', '|', ''], ['-', '-', '-'], ['', '|', '', '|', '']];
    this.turnNumber = 1;
  }

}

module.exports = TicTacToe;