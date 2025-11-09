// Player 4.0（今のところ一番強い）

cannon(-10, 60); // 最初にRookの点数を減らす
var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldHealth = 100; // 前の健康度
var isDetected = false; // アヒルが検出されたか
var oldX = getX();
var oldY = getY();

// メインループ
while (true) {
  
  if (health() >= 40) { // health: 40以上で処理を分ける

    isDetected = false;
    scanAngle = startAngle;
    
    while (scanAngle < endAngle) { // スキャン
      let angle = scan(scanAngle, 5);
      if (oldHealth > health()) {
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
      if (angle < 70) { // アヒルの存在を検知
        cannon(scanAngle, angle); // 大砲を発射する
        cannon(scanAngle, angle);
        startAngle = scanAngle - 15; // 次回のスキャン方向をセット
        endAngle = scanAngle + 15;
        isDetected = true;
        if (angle < 22) {
          swim(scanAngle - 180, 100);
          var counter = 0;
          var scantyuAngle = startAngle;
          while (counter < 80) {
            while (scantyuAngle < endAngle) {
              angle = scan(scantyuAngle, 5);
              if (oldHealth > health()) {
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
              if (angle < 70) {
                stop();
                cannon(scantyuAngle, angle);
                break;
              }
              counter += 1;
              scantyuAngle += 5;
              oldHealth = health();
            }
            scantyuAngle = 1;
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
          counter += 1;
        }
      }
      scanAngle += 5;
    }

    if (isDetected == false) { // アヒルが検知されなかった場合
      startAngle = 0;
      endAngle = 360;
      while (scanAngle < 360) {
        let angle = scan(scanAngle, 6);
        if (oldHealth > health()) {
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
        if (angle < 70) {
          cannon(scanAngle, angle);
          cannon(scanAngle, angle);
          startAngle = scanAngle - 15;
          endAngle = scanAngle + 15;
          isDetected = true;
          if (angle < 22) {
            swim(scanAngle - 180, 100);
            var counter = 0;
            var scantyuAngle = startAngle;
            while (counter < 100) {
              while (scantyuAngle < endAngle) {
                if (oldHealth > health()) {
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
                angle = scan(scantyuAngle, 5);
                if (angle < 70) {
                  stop();
                  cannon(scantyuAngle, angle);
                  break;
                }
                counter += 1;
                scantyuAngle += 5;
                oldHealth = health();
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
            counter += 1;
          }
        }
      scanAngle += 6;
      }
    }
    
  } else {
    let corner = getRandom(1, 4);
    moveCornerTo(corner);
  }
  
  if (startAngle == endAngle) { // startAngleとendAngleが同じになってしまった場合
    startAngle = 0;
    endAngle = 360;
  }
  
  if (oldHealth > health()) {
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
  
  if (oldX == getX() && oldY == getY()) {
    swim(Math.random() * 360);
  }
  
  if (getX() < 15) {
    stop();
  }
  if (getX() > 85) {
    stop();
  }
  
  if (getY() < 15) {
    stop();
  }
  if (getY() > 85) {
    stop();
  }

  oldHealth = health();
  oldX = getX();
  oldY = getY();

}

function getAngle(x1, y1, x2, y2) {
  var radian = Math.atan2(y2 - y1, x2 - x1);
  return radian
}

function moveCornerTo(corner) {
  if (corner == 1) {
    swim(getAngle(getX(), getY(), 0, 100));
  } else if (corner == 2) {
    swim(getAngle(getX(), getY(), 100, 100));
  } else if (corner == 3) {
    swim(getAngle(getX(), getY(), 0, 0));
  } else if (corner == 4) {
    swim(getAngle(getX(), getY(), 100, 0));
  }
}

//最大値・最小値を引数に持つ関数
function getRandom(min, max) {
  var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
  return random;
}
