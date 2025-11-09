// Player 9.3

cannon(-10, 60); // 最初にRookの体力を減らす

const maxP = 85;
const minP = 75;
const maxN = 15;
const minN = 25;

var startAngle = 0; // スキャンを開始する方向
var endAngle = 360; // スキャンを終了する方向
var scanAngle = 0; // スキャン中の方向
var oldAngleD = 0;
var oldAngle = 0;
var oldHealth = 100; // 前回の体力
var isDetected = false; // アヒルが検出されたか
var previousDetected = false;
var scanRange = 20;
var scanWidth = 10;
var isEdgeStop = false;
var swimmingAngle = 0;
var previousX = 0; // 敵の前回スキャン時位置
var previousY = 0;
var previousX2 = 0; // 敵の前々回スキャン時位置
var previousY2 = 0;
var enemyX = 0; // 敵の予想位置
var enemyY = 0;

var corner = 0;

var c1x = 5, c1y = 5;
var c2x = 5, c2y = 95;
var c3x = 95, c3y = 95;
var c4x = 95, c4y = 5;

var isMovingToCorner = false;

moveToCorner();
log('health:' + (health()));
// メインループ
while (true) {

    scanAngle = startAngle;

    previousX2 = previousX;
    previousY2 = previousY;
    let radian = scanAngle * Math.PI / 180;
    previousX = oldAngleD * Math.cos(radian);
    previousY = oldAngleD * Math.sin(radian);
    let movedX = previousX - previousX2;
    let movedY = previousY - previousY2;
    enemyX = previousX + movedX * 3;
    enemyY = previousY + movedY * 3;
    let angle2 = Math.atan2(enemyY - getY(), enemyX - getX()) * 180 / Math.PI;
    if (isDetected == false) { // アヒルが検知されなかった場合
        startAngle = 0;
        endAngle = 360;
        scanWidth = 16;
        scanRange = 16;
        moveToCorner();
    } else {
        if (Math.abs(scanAngle - angle2) < 20 && Math.abs(endAngle - angle2)) {
            if (scanAngle - 8 > angle2) {
                scanAngle = angle2 - 5
            } else if (endAngle + 8 < angle2) {
                endAngle = angle2 + 5
            }
        }
        scanWidth = (Math.abs(startAngle - endAngle) / 8); // 次回のスキャンの広さを設定
        scanRange = (Math.abs(startAngle - endAngle) / 8); // 次回のスキャンの範囲を設定
    }
    /*if (startAngle == endAngle) { // startAngleとendAngleが同じになってしまった場合
        startAngle = 0;
        endAngle = 360;
        scanWidth = 10;
    }*/

    isDetected = false;

    let oldAngleScan = scan(oldAngle);
    if (oldAngleScan <= 70) {
        cannon(oldAngle, oldAngleScan);
    } else {
        while (scanAngle < endAngle) { // スキャン
            let angle = scan(scanAngle, scanWidth);
            checkEdge();
            if (oldHealth > health()) {
                moveToCorner();
                oldHealth = health();
                log('health:' + (health()));
            }
            if (angle <= 70) { // アヒルの存在を検知
                if (previousDetected) {
                    previousDetected = isDetected;
                    previousX2 = previousX;
                    previousY2 = previousY;
                    let radian = scanAngle * Math.PI / 180;
                    previousX = angle * Math.cos(radian);
                    previousY = angle * Math.sin(radian);
                    let movedX = previousX - previousX2;
                    let movedY = previousY - previousY2;
                    enemyX = previousX + movedX * 3;
                    enemyY = previousY + movedY * 3;
                    let angle2 = Math.atan2(enemyY - getY(), enemyX - getX()) * 180 / Math.PI;
                    let len = Math.sqrt(Math.pow(enemyX - getX(), 2) + Math.pow(enemyY - getY(), 2));
                    if (len <= 70) {
                        log(angle2);
                        //log(`Previous: ${previousX}, ${previousY}`);
                        //log(`enemyX: ${enemyX}, ${enemyY}`);
                        cannon(angle2, len); // 大砲を発射する
                    } else {
                        cannon(scanAngle, angle);
                        previousDetected = false;
                    }
                } else {
                    cannon(scanAngle, angle);  // 大砲を発射する
                }
                //cornerCannon();
                startAngle = scanAngle - 15; // 次回のスキャン方向をセット
                endAngle = scanAngle + 15;
                if (oldAngle == scanAngle && oldAngleD == angle) {
                    while (scan(scanAngle) == angle) {
                        cannon(scanAngle, angle);
                        if (oldHealth != health()) {
                            let oldX = getX();
                            if (getX() < 50) {
                                customSwim(0, 100);
                                isEdgeStop = true;
                                var k = 0;
                                while (k < 5) {
                                    k += 1;
                                    checkEdge();
                                }
                            } else {
                                customSwim(180, 100);
                                isEdgeStop = true;
                                var k = 0;
                                while (k < 5) {
                                    k += 1;
                                    checkEdge();
                                }
                            }
                            if (oldX == getX()) {
                                if (getY() < 50) {
                                    customSwim(-90, 100);
                                    isEdgeStop = true;
                                    var k = 0;
                                    while (k < 5) {
                                        k += 1;
                                        checkEdge();
                                    }
                                } else {
                                    customSwim(90, 100);
                                    isEdgeStop = true;
                                    var k = 0;
                                    while (k < 5) {
                                        k += 1;
                                        checkEdge();
                                    }
                                }
                            }
                            oldHealth = health();
                            log(/*'your health: ' + */(health()));
                            break;
                        }
                        checkEdge();
                    }
                }
                oldAngle = scanAngle;
                oldAngleD = angle;
                isDetected = true;
                break;
            } else if (angle != Infinity) {
                moveToCorner();
                scan(scanAngle, scanWidth);
                isEdgeStop = true;
                var counter = 0;
                while (counter < 80) {
                    var d = scan(scanAngle, scanWidth);
                    if (oldHealth > health()) {
                        let oldX = getX();
                        if (getX() < 50) {
                            customSwim(0, 100);
                            isEdgeStop = true;
                            var k = 0;
                            while (k < 5) {
                                k += 1;
                                checkEdge();
                            }
                        } else {
                            customSwim(180, 100);
                            isEdgeStop = true;
                            var k = 0;
                            while (k < 5) {
                                k += 1;
                                checkEdge();
                            }
                        }

                        if (oldX == getX()) {
                            if (getY() < 50) {
                                customSwim(-90, 100);
                                isEdgeStop = true;
                                var k = 0;
                                while (k < 5) {
                                    k += 1;
                                    checkEdge();
                                }
                            } else {
                                customSwim(90, 100);
                                isEdgeStop = true;
                                var k = 0;
                                while (k < 5) {
                                    k += 1;
                                    checkEdge();
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
                    checkEdge();
                }
            }
            scanAngle += scanRange;
        }
    }

    if (oldHealth > health()) {
        let oldX = getX();
        if (getX() < 50) {
            customSwim(0, 100);
            isEdgeStop = true;
        } else {
            customSwim(180, 100);
            isEdgeStop = true;
        }

        if (oldX == getX()) {
            if (getY() < 50) {
                customSwim(-90, 100);
                isEdgeStop = true;
            } else {
                customSwim(90, 100);
                isEdgeStop = true;
            }
        }
        oldHealth = health();
        log(/*'your health: ' + */(health()));
    }

    checkEdge();
}

function checkEdge() {
    if (getX() < minN) {
        if (speed() > 0 && isEdgeStop == false) {
            if (!isMovingToCorner) {
                stop();
            }
            isEdgeStop = true;
        }
    }
    if (getX() > minP) {
        if (speed() > 0 && isEdgeStop == false) {
            if (!isMovingToCorner) {
                stop();
            }
            isEdgeStop = true;
        }
    }
    if (getY() < minN) {
        if (speed() > 0 && isEdgeStop == false) {
            if (!isMovingToCorner) {
                stop();
            }
            isEdgeStop = true;
        }
    }
    if (getY() > minP) {
        if (speed() > 0 && isEdgeStop == false) {
            if (!isMovingToCorner) {
                stop();
            }
            isEdgeStop = true;
        }
    }

    if (getX() < maxN && getX() > minN) {
        if (speed() > 0) {
            if (!isMovingToCorner) {
                swim(swimmingAngle, 50);
                previousDetected = false;
            }
            isEdgeStop = true;
        }
    }
    if (getX() > maxP && getX() < minP) {
        if (speed() > 0) {
            if (!isMovingToCorner) {
                swim(swimmingAngle, 50);
                previousDetected = false;
            }
        }
    }
    if (getY() < maxN && getY() > minN) {
        if (speed() > 0) {
            if (!isMovingToCorner) {
                swim(swimmingAngle, 50);
                previousDetected = false;
            }
        }
    }
    if (getY() > maxP && getY() < minP) {
        if (speed() > 0) {
            if (!isMovingToCorner) {
                swim(swimmingAngle, 50);
                previousDetected = false;
            }
        }
    }

    if (
        getX() > minN &&
        getX() < minP &&
        getY() > minN &&
        getY() < minP
    ) {
        isEdgeStop = false;
    }
}

function customSwim(angle, speed) {
    swim(angle, speed)
    swimmingAngle = angle;
    previousDetected = false;
}

function moveToCorner() {
    isMovingToCorner = true

    let oldX = getX(); // 元の座標
    let oldY = getY();
    var toY = 0; // 行き先の座標
    var toX = 0;

    var rand = Math.floor(Math.random() * 4);
    while (corner == rand) {
        rand = Math.floor(Math.random() * 4);
        checkEdge();
    }
    corner = rand;

    switch (corner) {
        case 0:
            toX = c1x;
            toY = c1y;
            break;
        case 1:
            toX = c2x;
            toY = c2y;
            break;
        case 2:
            toX = c3x;
            toY = c3y;
            break;
        case 3:
            toX = c4x;
            toY = c4y;
            break;
    }

    var len = Math.sqrt(Math.pow(toX - oldX, 2) + Math.pow(toY - oldY, 2)); // 二点の距離を求める
    var rad = Math.atan2(toY - oldY, toX - oldX); // ラジアン角度を求める
    var angle = rad * (180 / Math.PI); // ラジアンを度に変換

    customSwim(angle, len);

    if (getX() == oldX) {
        moveToCorner();
    }

    isMovingToCorner = false
}

function cornerCannon() {

    let oldX = getX(); // 元の座標
    let oldY = getY();
    var toY = 0; // 行き先の座標
    var toX = 0;

    var rand = Math.floor(Math.random() * 4);

    switch (rand) {
        case 0:
            toX = c1x;
            toY = c1y;
            break;
        case 1:
            toX = c2x;
            toY = c2y;
            break;
        case 2:
            toX = c3x;
            toY = c3y;
            break;
        case 3:
            toX = c4x;
            toY = c4y;
            break;
    }

    var len = Math.sqrt(Math.pow(toX - oldX, 2) + Math.pow(toY - oldY, 2)); // 二点の距離を求める
    var rad = Math.atan2(toY - oldY, toX - oldX); // ラジアン角度を求める
    var angle = rad * (180 / Math.PI); // ラジアンを度に変換

    cannon(angle, len);
}
