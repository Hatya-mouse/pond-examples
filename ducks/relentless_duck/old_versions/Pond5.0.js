// Player 5.0（今のところ一番強い）

cannon(-10, 60); // 最初にRookの点数を減らす

var maxX = 88;
var minX = 12;
var maxY = 88;
var minY = 12;

var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldAngle = 0; // 前のアヒルを検知した方向
var oldAngleD = 0; // 前のアヒルまでの距離
var oldHealth = 100; // 前の健康度
var isDetected = false; // アヒルが検出されたか
var oldX = getX();
var oldY = getY();

// メインループ
while (true) {

  isDetected = false;
  scanAngle = startAngle;
  while (scanAngle < endAngle) { // スキャン
    let angle = scan(scanAngle, 3);
    if (oldHealth > health()) {
      changeHealth();
      oldHealth = health();
    }
    if (angle < 70) { // アヒルの存在を検知
      cannon(scanAngle, angle); // 大砲を発射する
      cannon(scanAngle, angle);
      startAngle = scanAngle - 15; // 次回のスキャン方向をセット
      endAngle = scanAngle + 15;
      if (oldAngle == scanAngle && oldAngleD == angle) {
        while (scan(scanAngle, 4) == angle) {
          cannon(scanAngle, angle);
          if (oldHealth > health()) {
            changeHealth();
          }
        }
      }
      oldAngle = scanAngle;
      oldAngleD = angle;
      isDetected = true;
      if (angle < 22) {
        swim(scanAngle - 180, 100);
        var counter = 0;
        var scantyuAngle = startAngle;
        while (counter < 80) {
          while (scantyuAngle < endAngle) {
            angle = scan(scantyuAngle, 4);
            if (angle < 70) {
              stop();
              cannon(scantyuAngle, angle);
              break;
            }
            counter += 5;
            scantyuAngle += 4;
          }
          scantyuAngle = 2;
        }
      }
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
        counter += 8;
      }
    }
    scanAngle += 3;
  }
  
  if (isDetected == false) { // アヒルが検知されなかった場合
    if (getX() < 50 && getY() > 50) {
      startAngle = 0;
      endAngle = 360;
    }
    while (scanAngle > 0) {
      let angle = scan(scanAngle, 4);
      if (oldHealth > health()) {
        changeHealth();
        oldHealth = health();
      }
      if (angle < 70) {
        cannon(scanAngle, angle);
        cannon(scanAngle, angle);
        startAngle = scanAngle - 15;
        endAngle = scanAngle + 15;
        if (oldAngle == scanAngle && oldAngleD == angle) {
          while (scan(scanAngle) == angle) {
            cannon(scanAngle, angle);
            if (oldHealth > health()) {
              changeHealth();
            }
          }
        }
        oldAngle = scanAngle;
        oldAngleD = angle;
        isDetected = true;
        if (angle < 22) {
          swim(scanAngle - 180, 100);
          var counter = 0;
          var scantyuAngle = startAngle;
          while (counter < 80) {
            while (scantyuAngle < endAngle) {
              angle = scan(scantyuAngle, 4);
              if (oldHealth > health()) {
                changeHealth();
                oldHealth = health();
              }
              if (angle < 70) {
                stop();
                cannon(scantyuAngle, angle);
                break;
              }
              counter += 5;
              scantyuAngle += 4;
            }
            scantyuAngle = 1;
          }
        }
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
          counter += 8;
        }
      }
      scanAngle += 4;
    }
  }
  
  if (startAngle == endAngle) { // startAngleとendAngleが同じになってしまった場合
    startAngle = 0;
    endAngle = 360;
  }
  
  if (oldHealth > health()) {
    changeHealth();
    oldHealth = health();
  }
  
  if (oldX == getX() && oldY == getY()) {
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
  
  scanAndCannon(0);
  scanAndCannon(90);
  scanAndCannon(180);
  scanAndCannon(270);

  oldX = getX();
  oldY = getY();

}

function changeHealth() {
  
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
  
  oldHealth = health();
  
}

function scanAndCannon(angle) {
  var distance = scan(angle);
  if (distance < 70) {
    cannon(angle, distance);
  }
}
