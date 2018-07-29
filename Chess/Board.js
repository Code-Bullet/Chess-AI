class Board {
  constructor() {
    this.whitePieces = [];
    this.blackPieces = [];
    this.score = 0;
    this.setupPieces();


  }

  setupPieces() {
    this.whitePieces.push(new King(4, 7, true));
    this.whitePieces.push(new Queen(3, 7, true));
    this.whitePieces.push(new Bishop(2, 7, true));
    this.whitePieces.push(new Bishop(5, 7, true));
    this.whitePieces.push(new Knight(1, 7, true));
    this.whitePieces.push(new Rook(0, 7, true));
    this.whitePieces.push(new Knight(6, 7, true));
    this.whitePieces.push(new Rook(7, 7, true));

    this.whitePieces.push(new Pawn(4, 6, true));
    this.whitePieces.push(new Pawn(3, 6, true));
    this.whitePieces.push(new Pawn(2, 6, true));
    this.whitePieces.push(new Pawn(5, 6, true));
    this.whitePieces.push(new Pawn(1, 6, true));
    this.whitePieces.push(new Pawn(0, 6, true));
    this.whitePieces.push(new Pawn(6, 6, true));
    this.whitePieces.push(new Pawn(7, 6, true));

    //black pieces
    this.blackPieces.push(new King(4, 0, false));
    this.blackPieces.push(new Queen(3, 0, false));
    this.blackPieces.push(new Bishop(2, 0, false));
    this.blackPieces.push(new Bishop(5, 0, false));
    this.blackPieces.push(new Knight(1, 0, false));
    this.blackPieces.push(new Rook(0, 0, false));
    this.blackPieces.push(new Knight(6, 0, false));
    this.blackPieces.push(new Rook(7, 0, false));

    this.blackPieces.push(new Pawn(4, 1, false));
    this.blackPieces.push(new Pawn(3, 1, false));
    this.blackPieces.push(new Pawn(2, 1, false));
    this.blackPieces.push(new Pawn(5, 1, false));
    this.blackPieces.push(new Pawn(1, 1, false));
    this.blackPieces.push(new Pawn(0, 1, false));
    this.blackPieces.push(new Pawn(6, 1, false));
    this.blackPieces.push(new Pawn(7, 1, false));


  }

  show() {
    for (var i = 0; i < this.whitePieces.length; i++) {
      this.whitePieces[i].show();
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      this.blackPieces[i].show();
    }
  }

  isPieceAt(x, y) {
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x ==
        x && this.whitePieces[i].matrixPosition.y == y) {
        return true;
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x ==
        x && this.blackPieces[i].matrixPosition.y == y) {
        return true;
      }
    }
    return false;
  }

  getPieceAt(x, y) {
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x ==
        x && this.whitePieces[i].matrixPosition.y == y) {
        return this.whitePieces[i];
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x ==
        x && this.blackPieces[i].matrixPosition.y == y) {
        return this.blackPieces[i];
      }
    }
    return null;
  }


  generateNewBoardsWhitesTurn() {
    var boards = [];
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken) {
        var tempArr = this.whitePieces[i].generateNewBoards(this);
        for (var j = 0; j < tempArr.length; j++) {
          boards.push(tempArr[j]);
        }
      }
    }
    return boards;
  }
  generateNewBoardsBlacksTurn() {
    var boards = [];
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken) {
        var tempArr = this.blackPieces[i].generateNewBoards(this);
        for (var j = 0; j < tempArr.length; j++) {
          boards.push(tempArr[j]);
        }
      }
    }
    return boards;
  }

  setScore() {
    this.score = 0;
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken) {
        this.score -= this.whitePieces[i].value;
      } else {
        //print("something");
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken) {
        this.score += this.blackPieces[i].value;
      } else {
        //print("something");
      }
    }

  }

  move(from, to) {
    var pieceToMove = this.getPieceAt(from.x, from.y);
    if (pieceToMove == null) {
      //print("shit");
      return;
    }
    // if (pieceToMove.canMove(to.x, to.y, this)) {
    pieceToMove.move(to.x, to.y, this);
    // }
  }


  clone() {
    var clone = new Board();
    for (var i = 0; i < this.whitePieces.length; i++) {
      clone.whitePieces[i] = this.whitePieces[i].clone();
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      clone.blackPieces[i] = this.blackPieces[i].clone();
    }
    return clone;
  }

  isDone() {
    return this.whitePieces[0].taken || this.blackPieces[0].taken;
  }
  isDead() {
    if (whiteAI && whitesMove) {
      return this.whitePieces[0].taken;
    }
    if (blackAI && !whitesMove) {
      return this.blackPieces[0].taken;
    }

    return false;
  }

  hasWon() {
    if (whiteAI && whitesMove) {
      return this.blackPieces[0].taken;
    }
    if (blackAI && !whitesMove) {
      return this.whitePieces[0].taken;
    }

    return false;
  }
}
