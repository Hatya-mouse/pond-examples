// Player 8.1（今のところ一番強い）

cannon(-10, 60); // 最初にRookの点数を減らす

var maxX = 82;
var minX = 18;
var maxY = 82;
var minY = 18;

var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldAngle = 0;
var oldAngleD = 0;
var oldHealth = 100; // 前の健康度
var isDetected = false; // アヒルが検出されたか
var oldX = getX();
var oldY = getY();

// メインループ
while (true) {

  isDetected = false;
  scanAngle = startAngle;
  while (scanAngle < endAngle) { // スキャン
    let angle = scan(scanAngle, 5);
    if (oldHealth > health()) {
      escape();
    }
    if (angle < 70) { // アヒルの存在を検知
      cannon(scanAngle, angle); // 大砲を発射する
      cannon(scanAngle, angle);
      startAngle = scanAngle - 15; // 次回のスキャン方向をセット
      endAngle = scanAngle + 15;
      isDetected = true;
      if (oldAngle == scanAngle && oldAngleD == angle) {
        while (scan(scanAngle) == angle) {
          cannon(scanAngle, angle);
          if (oldHealth != health()) {
            changeHealth();
          }
        }
      }
      oldAngle = scanAngle;
      oldAngleD = angle;
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
        counter += 5;
      }
    }
    scanAngle += 5;
  }
  
  if (isDetected == false) { // アヒルが検知されなかった場合
    startAngle = 0;
    endAngle = 360;
    while (scanAngle < 360) {
      let angle = scan(scanAngle);
      if (oldHealth > health()) {
        escape();
      }
      if (angle < 70) {
        cannon(scanAngle, angle);
        cannon(scanAngle, angle);
        startAngle = scanAngle - 15;
        endAngle = scanAngle + 15;
        isDetected = true;
        if (oldAngle == scanAngle && oldAngleD == angle) {
          while (scan(scanAngle) == angle) {
            cannon(scanAngle, angle);
            if (oldHealth != health()) {
              changeHealth();
            }
          }
        }
        oldAngle = scanAngle;
        oldAngleD = angle;
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
    startAngle = 0;
    endAngle = 360;
  }
  
  if (oldX == getX() && oldY == getY() || health() < 5) {
    swim(Math.random() * 360);
  }
  
  if (getX() <= minX) {
    stop();
  }
  if (getX() >= maxX) {
    stop();
  }
  
  if (getY() <= minY) {
    stop();
  }
  if (getY() >= maxY) {
    stop();
  }
  
  oldX = getX();
  oldY = getY();
  
  if (oldHealth > health()) {
    escape();
  }

}

function escape() {
  let oldX = getX();
  var k = 0;
  if (getX() < 50) {
    swim(0, 100);
    while (k < 5) {
      k += 1;
    }
  } else {
    swim(180, 100);
    k = 0;
    while (k < 5) {
      k += 1;
    }
  }
  
  if (oldX == getX()) {
    if (getY() < 50) {
      swim(-90, 100);
      k = 0;
      while (k < 5) {
        k += 1;
      }
    } else {
      swim(90, 100);
      k = 0;
      while (k < 5) {
        k += 1;
      }
    }
  }
  oldHealth = health();
}
