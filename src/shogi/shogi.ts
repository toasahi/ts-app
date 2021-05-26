import { Suji, Dan, Player, Distance } from './types/rules';
//コマの位置を表すクラス
export class Position {
  constructor(private suji: Suji, private dan: Dan) {}
  //パラメーターに渡された位置と現在の距離を比較
  distanceFrom(postion: Position, player: Player) {
    if (player === 'first') {
      return {
        suji: Math.abs(postion.suji - this.suji),
        dan: Math.abs(Number(postion.dan) - Number(this.dan)),
      };
    } else {
      return {
        suji: Math.abs(postion.suji - this.suji),
        dan: -Math.abs(Number(postion.dan) - Number(this.dan)), //後手は正負を反転
      };
    }
  }
}

//駒の親(抽象クラス)
export abstract class Piece {
  //Pieceクラスとサブクラスで扱うことができる
  protected postion: Position;
  constructor(private readonly player: Player, suji: Suji, dan: Dan) {
    this.postion = new Position(suji, dan);
  }
  //駒の移動
  toMove(position: Position) {
    this.postion = position;
  }

  //移動可能か判定
  abstract canToMove(position: Position, player: Player): boolean;
}

//王将
class Osho extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 2 && distance.dan < 2;
  }
}

//金将
class Kinsyo extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 2 && distance.dan < 2 && this.moveKinsyoRule(distance);
  }
  moveKinsyoRule(distance: Distance): boolean {
    return (distance.suji != 1 && distance.dan != -1) || (distance.suji != -1 && distance.dan != -1);
  }
}

//銀将
class Ginsyo extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 2 && distance.dan < 2 && this.moveGinsyoRule(distance);
  }
  moveGinsyoRule(distance: Distance): boolean {
    return distance.dan != 0 || distance.suji != 0;
  }
}

//桂馬
class Keima extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 4 && distance.dan < 4 && this.moveKeimaRule(distance);
  }
  moveKeimaRule(distance: Distance): boolean {
    return distance.dan == -2 && distance.suji != 0;
  }
}

//飛車
class Hisya extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 9 && distance.dan < 9 && this.moveHisyaRuels(distance);
  }
  moveHisyaRuels(distance: Distance) {
    return distance.suji == 0 || distance.dan == 0;
  }
}

//香車
class Kyousya extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 9 && distance.dan == 0;
  }
}

//角行
class Kakugyo extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 5 && distance.dan < 5 && this.moveKakugyoRule(distance);
  }
  moveKakugyoRule(distance: Distance) {
    return distance.dan != 0 && distance.suji != 0;
  }
}

//歩
class Fu extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji === 0 && distance.dan === 1;
  }
}

class Game {
  private pieces = Game.makePieces();
  private static makePieces() {
    return [
      new Osho('first', 5, '1'),
      new Osho('second', 5, '9'),
      new Kinsyo('first', 4, '1'),
      new Kinsyo('first', 6, '1'),
      new Kinsyo('second', 4, '9'),
      new Kinsyo('second', 6, '9'),
      new Ginsyo('first', 3, '1'),
      new Ginsyo('first', 7, '1'),
      new Ginsyo('second', 3, '9'),
      new Ginsyo('second', 7, '9'),
      new Keima('first', 2, '1'),
      new Keima('first', 8, '1'),
      new Keima('second', 2, '9'),
      new Keima('second', 8, '9'),
      new Kyousya('first', 1, '1'),
      new Kyousya('first', 9, '1'),
      new Kyousya('second', 1, '9'),
      new Kyousya('second', 9, '9'),
      new Kakugyo('first', 2, '2'),
      new Kakugyo('second', 8, '8'),
      new Hisya('first', 8, '2'),
      new Hisya('second', 2, '8'),
      new Fu('first', 1, '1'),
      new Fu('first', 2, '1'),
      new Fu('first', 3, '1'),
      new Fu('first', 4, '1'),
      new Fu('first', 5, '1'),
      new Fu('first', 6, '1'),
      new Fu('first', 7, '1'),
      new Fu('first', 8, '1'),
      new Fu('first', 9, '1'),
      new Fu('second', 1, '1'),
      new Fu('second', 2, '1'),
      new Fu('second', 3, '1'),
      new Fu('second', 4, '1'),
      new Fu('second', 5, '1'),
      new Fu('second', 6, '1'),
      new Fu('second', 7, '1'),
      new Fu('second', 8, '1'),
      new Fu('second', 9, '1'),
    ];
  }
}
