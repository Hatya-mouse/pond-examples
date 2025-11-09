// Player 2.0（今のところ一番強い）

cannon(-10, 60); // 最初にRookの点数を減らす
var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldHealth = 100; // 前の健康度
var isDetected = false; // アヒルが検出されたか

// メインループ
while (true) {

  isDetected = false;
  scanAngle = startAngle;
  while (scanAngle < endAngle) { // スキャン
    if (startAngle == 0 && endAngle == 360) {
      let angle = scan(scanAngle, 5);
      if (angle < 70) { // アヒルの存在を検知
        cannon(scanAngle, angle); // 大砲を発射する
        cannon(scanAngle, angle);
        startAngle = scanAngle - 15; // 次回のスキャン方向をセット
        endAngle = scanAngle + 15;
        isDetected = true;
        break;
      } else if (angle != Infinity) {
        swim(scanAngle, 100);
        var counter = 0;
        while (counter < 80) {
          if (angle < 70) {
            stop();
            cannon(scanAngle, angle);
            break;
          }
          counter += 1;
        }
      }
      scanAngle += 5;
    } else {
      let angle = scan(scanAngle);
      if (angle < 70) { // アヒルの存在を検知
        cannon(scanAngle, angle); // 大砲を発射する
        cannon(scanAngle, angle);
        startAngle = scanAngle - 15; // 次回のスキャン方向をセット
        endAngle = scanAngle + 15;
        isDetected = true;
        break;
      } else if (angle != Infinity) {
        swim(scanAngle, 100);
        var counter = 0;
        while (counter < 80) {
          if (angle < 70) {
            stop();
            cannon(scanAngle, angle);
            cannon(scanAngle, angle);
            cannon(scanAngle, angle);
            break;
          }
          counter += 1;
        }
      }
      scanAngle += 1;
    }
  }
  
  if (isDetected == false) { // アヒルが検知されなかった場合
    startAngle = 0;
    endAngle = 360;
    while (scanAngle < 360) {
      let angle = scan(scanAngle);
      if (angle < 70) {
        cannon(scanAngle, angle);
        cannon(scanAngle, angle);
        startAngle = scanAngle - 15;
        endAngle = scanAngle + 15;
        isDetected = true;
        break;
      } else if (angle != Infinity) {
        swim(scanAngle, 100);
        var counter = 0;
        while (counter < 100) {
          if (angle < 70) {
            stop();
            cannon(scanAngle, angle);
            break;
          }
          counter += 5;
        }
      }
      scanAngle += 5;
    }
  }
  
  if (startAngle == endAngle) { // startAngleとendAngleが同じになってしまった場合
    startAngle = scanAngle - 90;
    endAngle = scanAngle - 90;
  }
  
  if (oldHealth > health()) {
    cannon(0, 10);
    cannon(45, 10);
    cannon(90, 10);
    cannon(135, 10);
    cannon(180, 10);
    cannon(225, 10);
    cannon(270, 10);
    cannon(115, 10);
    let oldX = getX();
    if (getX() < 50) {
      swim(0, 100);
      var k = 0;
      while (k < 5) {
        k += 1;
      }
    } else {
      swim(180, 100);
      var k = 0;
      while (k < 5) {
        k += 1;
      }
    }

    if (oldX == getX()) {
      if (getY() < 50) {
        swim(-90, 100);
        var k = 0;
        while (k < 5) {
          k += 1;
        }
      } else {
        swim(90, 100);
        var k = 0;
        while (k < 5) {
          k += 1;
        }
      }
    }
  }
  
  let x = getX();
  let y = getY();
  
  if (x < 15) {
    stop();
  }
  if (x > 85) {
    stop();
  }
  
  if (y < 15) {
    stop();
  } 
  if (y > 85) {
    stop();
  }

  oldHealth = health();

}
