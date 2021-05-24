import { Suji, Dan, Player } from './types/rules';

//コマの位置を表すクラス
class Position {
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
abstract class Piece {
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
    return distance.suji < 2 && distance.dan < 2 && distance.suji != 1 && distance.suji != -1 && distance.dan != 1;
  }
}

//飛車
class Hisya extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 5 && distance.dan < 5;
  }
}

//角行
class Kakugyo extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 5 && distance.dan < 5;
  }
}

//歩
class Fu extends Piece {
  canToMove(position: Position, player: Player): boolean {
    const distance = this.postion.distanceFrom(position, player);
    return distance.suji < 2;
  }
}