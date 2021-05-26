import { Osho, Kinsyo, Ginsyo, Keima, Kyousya, Kakugyo, Hisya, Fu } from './Koma';

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
