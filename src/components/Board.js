function Board(size) {
  this.board = this.initBoard(this.buildBoard(size), size);
  this.pawns = this.buildPawns(this.board, size);
}

const PAWNS_NUM = 24;

Board.prototype.buildBoard = size => {
  let temp = [];
  for (let i = 0; i < size; i++) {
    temp.push(Array(size).fill(null));
  }
  return temp;
};

Board.prototype.initBoard = (board, size) => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if ((i + j) % 2 !== 0 && i < 3) board[i][j] = 1;
      else if ((i + j) % 2 !== 0 && i > 4) board[i][j] = 2;
    }
  }
  return board;
};

Board.prototype.buildPawns = (board, size) => {
  let pawns = [];
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      if (board[i][j] === 1)
        pawns.push({ playerNum: 1, row: i, col: j, status: true });
      else if (board[i][j] === 2)
        pawns.push({ playerNum: 2, row: i, col: j, status: true });
  return pawns;
};

Board.prototype.movePawn = function(prevMove, newMove) {
  for (let i = 0; i < PAWNS_NUM; i++) {
    if (
      this.pawns[i].row === prevMove.row &&
      this.pawns[i].col === prevMove.col
    ) {
      let player = this.pawns[i].playerNum;
      this.pawns[i].row = newMove.row;
      this.pawns[i].col = newMove.col;
      this.board[prevMove.row][prevMove.col] = null;
      this.board[newMove.row][newMove.col] = player;
      break;
    }
  }
  return;
};

Board.prototype.checkIfMoveIsValid = function(prevMove, newMove) {
  let nextBox = this.board[newMove.row][newMove.col];
  let currentBox = this.board[prevMove.row][prevMove.col];

  if (nextBox != null) return false;
  else if (currentBox === 2) {
    if (
      newMove.row + 1 !== prevMove.row ||
      newMove.col === prevMove.col ||
      newMove.col > prevMove.col + 1 ||
      newMove.col < prevMove.col - 1
    )
      return false;
  } else if (currentBox === 1) {
    if (
      newMove.row - 1 !== prevMove.row ||
      newMove.col === prevMove.col ||
      newMove.col > prevMove.col + 1 ||
      newMove.col < prevMove.col - 1
    )
      return false;
  }
  return true;
};

Board.prototype.checkIfCanJump = function(prevMove, newMove) {
  let box = this.board[newMove.row][newMove.col];

  if (box) return false;

  let legelJump =
      Math.abs(prevMove.row - newMove.row) === 2 &&
      Math.abs(prevMove.col - newMove.col) === 2,
    side = prevMove.col > newMove.col;

  if (!legelJump) return false;

  let cuurentPlayer = this.board[prevMove.row][prevMove.col],
    leftUp = { row: prevMove.row - 1, col: prevMove.col - 1 },
    rightUp = { row: prevMove.row - 1, col: prevMove.col + 1 },
    leftDown = { row: prevMove.row + 1, col: prevMove.col - 1 },
    rightDown = { row: prevMove.row + 1, col: prevMove.col + 1 };

  if (cuurentPlayer === 2) {
    if (side) {
      this.removePawn(leftUp);
      return true;
    } else {
      this.removePawn(rightUp);
      return true;
    }
  } else if (cuurentPlayer) {
    if (side) {
      this.removePawn(leftDown);
      return true;
    } else {
      this.removePawn(rightDown);
      return true;
    }
  } else return false;
};

Board.prototype.removePawn = function(pawnPos) {
  for (let i = 0; i < PAWNS_NUM; i++) {
    if (
      this.pawns[i].row === pawnPos.row &&
      this.pawns[i].col === pawnPos.col
    ) {
      this.pawns[i].status = false;
      this.board[pawnPos.row][pawnPos.col] = null;
      return;
    }
  }
};

module.exports = Board;
