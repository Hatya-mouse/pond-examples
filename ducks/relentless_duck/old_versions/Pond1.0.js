// Player 1.0（作った中では一番強い）

cannon(-10, 60); // 最初にRookの点数を減らす

const maxX = 90;
const minX = 10;
const maxY = 90;
const minY = 10;

var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldAngleD = 0;
var oldAngle = 0;
var oldHealth = 100; // 前の健康度
var isDetected = false; // アヒルが検出されたか
var scanSpeed = 5;
var isEdgeStop = false;
var isSwimming = false;

// メインループ
while (true) {

  isDetected = false;
  scanAngle = startAngle;
  while (scanAngle < endAngle) { // スキャン
    let angle = scan(scanAngle, scanSpeed);
    if (oldHealth > health()) {
      log('Change Health');
      let oldX = getX();
      if (getX() < 50) {
        swim(0, 100);
        isEdgeStop = true;
        isSwimming = true;
      } else {
        swim(180, 100);
        isEdgeStop = true;
        isSwimming = true;
      }
      
      if (oldX == getX()) {
        if (getY() < 50) {
          swim(-90, 100);
          isSwimming = true;
          isEdgeStop = true;
        } else {
          swim(90, 100);
          isSwimming = true;
          isEdgeStop = true;
        }
      }
      oldHealth = health();
      log(health());
      break;
    }
    test();
    if (angle < 70) { // アヒルの存在を検知
      cannon(scanAngle, angle); // 大砲を発射する
      cannon(scanAngle, angle);
      startAngle = scanAngle - 15; // 次回のスキャン方向をセット
      endAngle = scanAngle + 15;
      if (oldAngle == scanAngle && oldAngleD == angle) {
        while (scan(scanAngle) == angle) {
          cannon(scanAngle, angle);
          if (oldHealth > health()) {
            log('Change Health');
            let oldX = getX();
            if (getX() < 50) {
              swim(0, 100);
              isEdgeStop = true;
              isSwimming = true;
            } else {
              swim(180, 100);
              isEdgeStop = true;
              isSwimming = true;
            }
      
            if (oldX == getX()) {
              if (getY() < 50) {
                swim(-90, 100);
                isSwimming = true;
                isEdgeStop = true;
              } else {
                swim(90, 100);
                isSwimming = true;
                isEdgeStop = true;
              }
            }
            oldHealth = health();
            log(health());
            break;
          }
          test();
        }
      }
      oldAngle = scanAngle;
      oldAngleD = angle;
      isDetected = true;
      break;
    } else if (angle != Infinity) {
      swim(scanAngle, scanSpeed);
      isSwimming = true;
      isEdgeStop = true;
      var counter = 0;
      while (counter < 80) {
        var d = scan(scanAngle, scanSpeed);
        if (oldHealth > health()) {
          log('Change Health');
            let oldX = getX();
            if (getX() < 50) {
              swim(0, 100);
              isEdgeStop = true;
              isSwimming = true;
            } else {
              swim(180, 100);
              isEdgeStop = true;
              isSwimming = true;
            }
      
            if (oldX == getX()) {
              if (getY() < 50) {
                swim(-90, 100);
                isSwimming = true;
                isEdgeStop = true;
              } else {
                swim(90, 100);
                isSwimming = true;
                isEdgeStop = true;
              }
            }
            oldHealth = health();
            log(health());
            break;
          }
          test();
        if (d < 70) {
          stop();
          isSwimming = false;
          cannon(scanAngle, d);
          break;
        }
        counter += scanSpeed;
      }
    }
    scanAngle += scanSpeed;
  }
  
  if (isDetected == false) { // アヒルが検知されなかった場合
    startAngle = 0;
    endAngle = 360;
    scanSpeed = 3;
  } else {
    scanSpeed = ((100 - oldAngleD) / 10); // 次回のスキャンのスピードを設定
  }
  
  if (startAngle == endAngle) { // startAngleとendAngleが同じになってしまった場合
    startAngle = 0;
    endAngle = 360;
  }
  
  if (oldHealth > health()) {
    log('Change Health');
    let oldX = getX();
    if (getX() < 50) {
      swim(0, 100);
      isSwimming = true;
      isEdgeStop = true;
    } else {
      swim(180, 100);
      isSwimming = true;
      isEdgeStop = true;
    }
    
    if (oldX == getX()) {
      if (getY() < 50) {
        swim(-90, 100);
        isSwimming = true;
        isEdgeStop = true;
      } else {
        swim(90, 100);
        isSwimming = true;
        isEdgeStop = true;
      }
    }
    oldHealth = health();
    log(health());
  }
  
  test();

}

function test() {
  if (isSwimming) {
    if (getX() < minX) {
      if (isEdgeStop = false) {
        stop();
        log('Stop');
        isSwimming = false;
        isEdgeStop = true;
      }
    }
    if (getX() > maxX) {
      if (isEdgeStop = false) {
        stop();
        log('Stop');
        isSwimming = false;
        isEdgeStop = true;
      }
    }
    if (getY() < minY) {
      if (isEdgeStop = false) {
        stop();
        log('Stop');
        isSwimming = false;
        isEdgeStop = true;
      }
    }
    if (getY() > maxY) {
      if (isEdgeStop = false) {
        stop();
        log('Stop');
        isSwimming = false;
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