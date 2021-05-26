import { Position, Piece } from './shogi';
import { Player, Distance } from './types/rules';

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

export { Osho, Kinsyo, Ginsyo, Kakugyo, Keima, Kyousya, Hisya, Fu };
