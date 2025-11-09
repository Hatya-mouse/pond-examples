// Player 9.1（作った中では一番強い）

//cannon(-10, 60); // 最初にRookの点数を減らす

const maxX = 85;
const minX = 15;
const maxY = 85;
const minY = 15;

var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldAngleD = 0;
var oldAngle = 0;
var oldHealth = 100; // 前の健康度
var isDetected = false; // アヒルが検出されたか
var scanRange = 5;
var scanSpeed = 5;
var isEdgeStop = false;

// メインループ
log(/*'your health: ' + */(health()));
while (true) {

  isDetected = false;
  scanAngle = startAngle;
  while (scanAngle < endAngle) { // スキャン
    let angle = scan(scanAngle, scanSpeed);
    if (getX() <= minX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getX() >= maxX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() <= minY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() >= maxY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (
    getX() > minX &&
    getX() < maxX &&
    getY() > minY &&
    getY() < maxY
    ) {
    isEdgeStop = false;
  }
    if (oldHealth > health()) {
    let oldX = getX();
    if (getX() < 50) {
      swim(0, 100);
      isEdgeStop = true;
      var k = 0;
      while (k < 5) {
        k += 1;
      }
    } else {
      swim(180, 100);
      isEdgeStop = true;
      var k = 0;
      while (k < 5) {
        k += 1;
      }
    }
    
    if (oldX == getX()) {
      if (getY() < 50) {
        swim(-90, 100);
        isEdgeStop = true;
        var k = 0;
        while (k < 5) {
          k += 1;
        }
      } else {
        swim(90, 100);
        isEdgeStop = true;
        var k = 0;
        while (k < 5) {
          k += 1;
        }
      }
    }
    oldHealth = health();
    log(/*'your health: ' + */(health()));
  }
    if (angle < 70) { // アヒルの存在を検知
      cannon(scanAngle, angle); // 大砲を発射する
      cannon(scanAngle, angle);
      startAngle = scanAngle - 15; // 次回のスキャン方向をセット
      endAngle = scanAngle + 15;
      if (oldAngle == scanAngle && oldAngleD == angle) {
        while (scan(scanAngle) == angle) {
        cannon(scanAngle, angle);
          if (oldHealth != health()) {
            let oldX = getX();
            if (getX() < 50) {
              swim(0, 100);
              isEdgeStop = true;
              var k = 0;
              while (k < 5) {
                k += 1;
              }
            } else {
              swim(180, 100);
              isEdgeStop = true;
              var k = 0;
              while (k < 5) {
                k += 1;
              }
            }
    
            if (oldX == getX()) {
              if (getY() < 50) {
                swim(-90, 100);
                isEdgeStop = true;
                var k = 0;
                while (k < 5) {
                  k += 1;
                }
              } else {
                swim(90, 100);
                isEdgeStop = true;
                var k = 0;
                while (k < 5) {
                  k += 1;
                }
              }
            }
            oldHealth = health();
            log(/*'your health: ' + */(health()));
            break;
          }
          if (getX() < minX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getX() > maxX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() < minY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() > maxY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  
  if (
    getX() > minX &&
    getX() < maxX &&
    getY() > minY &&
    getY() < maxY
    ) {
    isEdgeStop = false;
  }
        }
      }
      oldAngle = scanAngle;
      oldAngleD = angle;
      isDetected = true;
      break;
    } else if (angle != Infinity) {
      swim(scanAngle, scanSpeed);
      isEdgeStop = true;
      var counter = 0;
      while (counter < 80) {
        var d = scan(scanAngle, scanSpeed);
        if (getX() <= minX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getX() >= maxX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() <= minY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() >= maxY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (
    getX() > minX &&
    getX() < maxX &&
    getY() > minY &&
    getY() < maxY
    ) {
    isEdgeStop = false;
  }
        if (oldHealth > health()) {
    let oldX = getX();
    if (getX() < 50) {
      swim(0, 100);
      isEdgeStop = true;
      var k = 0;
      while (k < 5) {
        k += 1;
      }
    } else {
      swim(180, 100);
      isEdgeStop = true;
      var k = 0;
      while (k < 5) {
        k += 1;
      }
    }
    
    if (oldX == getX()) {
      if (getY() < 50) {
        swim(-90, 100);
        isEdgeStop = true;
        var k = 0;
        while (k < 5) {
          k += 1;
        }
      } else {
        swim(90, 100);
        isEdgeStop = true;
        var k = 0;
        while (k < 5) {
          k += 1;
        }
      }
    }
    oldHealth = health();
    log(health());
  }
        if (d < 70) {
          stop();
          cannon(scanAngle, d);
          break;
        }
        counter += scanRange;
      }
    }
    scanAngle += scanRange;
  }
  
  if (isDetected == false) { // アヒルが検知されなかった場合
    startAngle = 0;
    endAngle = 360;
    scanSpeed = 1;
    scanRange = 5;
  } else {
    scanSpeed = ((100 - oldAngleD) / 15); // 次回のスキャンのスピードを設定
    scanRange = ((100 - oldAngleD) / 12); // 次回のスキャンのスピードを設定
  }
  
  if (startAngle == endAngle) { // startAngleとendAngleが同じになってしまった場合
    startAngle = 0;
    endAngle = 360;
    scanSpeed = 3;
  }
  
  if (oldHealth > health()) {
    let oldX = getX();
    if (getX() < 50) {
      swim(0, 100);
      isEdgeStop = true;
    } else {
      swim(180, 100);
      isEdgeStop = true;
    }

    if (oldX == getX()) {
      if (getY() < 50) {
        swim(-90, 100);
        isEdgeStop = true;
      } else {
        swim(90, 100);
        isEdgeStop = true;
      }
    }
    oldHealth = health();
    log(/*'your health: ' + */(health()));
  }
  
  if (getX() < minX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getX() > maxX) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() < minY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  if (getY() > maxY) {
    if (isEdgeStop == false) {
      stop();
      isEdgeStop = true;
    }
  }
  
  if (
    getX() > minX &&
    getX() < maxX &&
    getY() > minY &&
    getY() < maxY
    ) {
    isEdgeStop = false;
  }

}