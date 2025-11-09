// Player 8.2（今のところ一番強い）

cannon(-10, 60); // 最初にRookの点数を減らす

var maxX = 90;
var minX = 10;
var maxY = 90;
var minY = 10;

var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldAngle = 0;
var oldAngleD = 0;
var scanSpeed = 5;
var oldHealth = 100; // 前の健康度
var isDetected = false; // アヒルが検出されたか
var oldX = 0;
var oldY = 0;

swim(0, 70);

// メインループ
while (true) {

  isDetected = false;
  scanAngle = startAngle;
  
  while (scanAngle < endAngle) { // スキャン
    let angle = scan(scanAngle, scanSpeed);
    
    if (oldHealth > health()) {
      nigeru();
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
            nigeru();
          }
        }
      }
      oldAngle = scanAngle;
      oldAngleD = angle;
      break;
    } else if (angle != Infinity) {
      swim(scanAngle, 70);
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
    scanAngle += scanSpeed;
  }

  if (isDetected == false) { // アヒルが検知されなかった場合
    startAngle = 0;
    endAngle = 360;
    scanSpeed = 3; // スキャンスピードをリセット
  } else {
    scanSpeed = ((100 - oldAngleD) / 10); // 次回のスキャンのスピードを設定
  }
  
  if (startAngle == endAngle) { // startAngleとendAngleが同じになってしまった場合
    startAngle = 0;
    endAngle = 360;
  }

  if (oldX == getX() && oldY == getY() || health() < 5) {
    swim(Math.random() * 360, 70);
    oldX = getX();
    oldY = getY();
  }
  
  if (getX() > 25 && getX() < 75 && getY() > 25 && getY() < 75) {
    moveRandomCorner();
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

  if (oldHealth > health()) {
    nigeru();
  }
}

function nigeru() {
  var oldX2 = getX();
  var k = 0;
  if (getX() < 50) {
    swim(10, 70);
    k = 0;
    while (k < 5) {
      k += 1;
    }
  } else {
    swim(190, 70);
    k = 0;
    while (k < 5) {
      k += 1;
    }
  }
  
  if (oldX2 == getX()) {
    if (getY() < 50) {
      swim(-100, 70);
      k = 0;
      while (k < 5) {
        k += 1;
      }
    } else {
      swim(100, 70);
      k = 0;
      while (k < 5) {
        k += 1;
      }
    }
  }
  oldHealth = health();
}

function scanAndCannon(angle) {
  var distance = scan(angle);
  if (distance < 70) {
    cannon(angle, distance);
  }
}

function moveRandomCorner() {var rand = Math.ceil(Math.random() * 4);
  if (rand == 0) {
    var a = Math.atan2( maxY() - getY(), minX() - getX() );
    swim(a);
  }
  if (rand == 1) {
    var a = Math.atan2( maxY() - getY(), maxX() - getX() );
    swim(a);
  }
  if (rand == 2) {
    var a = Math.atan2( minY() - getY(), minX() - getX() );
    swim(a);
  }
  if (rand == 3) {
    var a = Math.atan2( minY() - getY(), maxX() - getX() );
    swim(a);
  }
}